import { AtMessage } from "./AtMessage";
import { SyncEvent } from "ts-events-extended";
import { StringExtractor } from "./StringExtractor";
import { TrackableMap } from "trackable-map";

const Lexer = require("./Lexer");
const Parser = require("./Parser");

export function getSerialPortParser(delayBeforeFlush?: number){

        const delay= (typeof delayBeforeFlush === "number")?delayBeforeFlush:10000;

        let rawAtMessagesBuffer = "";
        let timer: NodeJS.Timer | null= null;
        let evtRawData= new SyncEvent<string>();

        type Main= (emitter: NodeJS.EventEmitter, buffer: Buffer)=> void;
        type Flush= ()=> string;

        let out: Main= function (emitter, buffer): void {

                let bufferString= buffer.toString("utf8");

                evtRawData.post(bufferString);

                rawAtMessagesBuffer += bufferString;

                let parserError: AtMessagesParserError | undefined = undefined;
                let atMessages: AtMessage[];

                try {

                        atMessages = atMessagesParser(rawAtMessagesBuffer);

                } catch (error) {

                        parserError = error as AtMessagesParserError;

                        if (!timer)
                                timer = setTimeout(() => {
                                        timer = null;
                                        emitter.emit("data", null, rawAtMessagesBuffer);
                                        rawAtMessagesBuffer = "";
                                }, delay);

                        atMessages = parserError.urcMessages;

                        rawAtMessagesBuffer = parserError.leftToParse;

                }

                if (!parserError) {
                        rawAtMessagesBuffer = "";
                        if (timer) {
                                clearTimeout(timer);
                                timer = null;
                        }
                }

                for (let atMessage of atMessages)
                        emitter.emit("data", atMessage, "");

        };

        (out as any).flush = function () {
                let out = rawAtMessagesBuffer;
                rawAtMessagesBuffer = "";
                if (timer) clearTimeout(timer);
                return out;
        } as Flush;

        Object.defineProperty(out, "evtRawData", {
                get() { return evtRawData; }
        });

        return out as Main & { flush: Flush; evtRawData: typeof evtRawData };


}


export class AtMessagesParserError extends Error {

        constructor(public readonly rawAtMessages: string,
                public readonly originalError: Error,
                public readonly urcMessages: AtMessage[],
                public readonly leftToParse: string
        ) {
                super(AtMessagesParserError.name);
                Object.setPrototypeOf(this, new.target.prototype)
        }

}

export function atMessagesParser(rawAtMessages: string): AtMessage[] {

        let leftToParseAfterUrc = rawAtMessages;

        let output = {
                "leftToParse": rawAtMessages,
                "atMessages": [] as AtMessage[],
                "AtMessage": AtMessage
        };


        try {

                if (rawAtMessages === "\r\nOK\r\n")
                        return [new AtMessage("\r\nOK\r\n", "OK")];

                let parser = new Parser();


                for (let phase of [
                        "UNSO",
                        "RESP",
                        "LIST_CMGL",
                        "LIST_CNUM",
                        "FINAL"
                ]) {

                        if (phase === "RESP" && output.leftToParse) {

                                let match: RegExpMatchArray | null;

                                match = output.leftToParse.match(/^((?:AT.*|A\/)\r)/);
                                if (!match) match = output.leftToParse.match(
                                        /^((?:[a-fA-F0-9]|\r\n)+)(?:$|\r\n\+CMGS)/
                                );

                                if (match) {

                                        let atMessage = new AtMessage(match[1], "ECHO");
                                        output.leftToParse = output.leftToParse.substring(
                                                atMessage.raw.length,
                                                output.leftToParse.length
                                        );
                                        output.atMessages.push(atMessage);

                                }

                                if (output.leftToParse === "\r\n> ") {
                                        output.atMessages.push(
                                                new AtMessage(output.leftToParse, "INVITE")
                                        );
                                        output.leftToParse = "";
                                }

                        }


                        if (!output.leftToParse) break;

                        let lexer = new Lexer();

                        lexer.AtMessage = AtMessage;

                        lexer.setInput(output.leftToParse);

                        output.leftToParse = "";

                        lexer.pushState(phase);

                        parser.parse(lexer, output);

                        if (phase === "UNSO") leftToParseAfterUrc = output.leftToParse;

                        /*
                        console.log(`End ${phase}`.blue);
                        console.log(`LeftToParse: \n${JSON.stringify(output.leftToParse)}`.blue);
                        console.log(`atMessages: \n${JSON.stringify(output.atMessages,null,2)}`.green);
                        */

                }

                let split = output.leftToParse.split("\r\nOK\r\n");

                if (split[split.length - 1]) throw new Error("Malformed");

                for (let i = 0; i < split.length - 1; i++) {

                        let raw = split[i];
                        output.atMessages.push(new AtMessage("\r\nOK\r\n", "OK"));

                        if (!raw) continue;

                        if (!raw.match(/^\r\n(?:\r|\n|.)+\r\n$/))
                                throw new Error("Malformed");

                        output.atMessages.push(new AtMessage(raw));


                }

                return reorder(rawAtMessages, output.atMessages);

        } catch (originalError) {

                let urcMessages: AtMessage[] = [];

                for (let atMessage of output.atMessages)
                        if (atMessage.isUnsolicited)
                                urcMessages.push(atMessage);

                throw new AtMessagesParserError(
                        rawAtMessages,
                        originalError,
                        urcMessages,
                        leftToParseAfterUrc
                );

        }

}


function reorder(
        rawAtMessages: string,
        atMessages: AtMessage[]
): AtMessage[] {

        let stringExtractor = new StringExtractor(rawAtMessages);

        let messageByPosition = new TrackableMap<number, AtMessage>();

        for (let atMessage of atMessages)
                messageByPosition.set(
                        stringExtractor.extract(atMessage.raw),
                        atMessage
                );

        console.assert(stringExtractor.state === "");

        let atMessagesSorted = messageByPosition.valuesAsArraySortedByKey();

        console.assert(atMessagesSorted.length === atMessages.length);

        return atMessagesSorted;

}