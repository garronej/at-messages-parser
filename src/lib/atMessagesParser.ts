import * as bl from "./businessLogic/index";

import {
        isUnso,
        isFinal,
        hasPdu,
        tokenToId
} from "./businessLogic/AtMessage";

import { SyncEvent } from "ts-events-extended";

Object.assign(bl, {
        "isUnso": isUnso,
        "isFinal": isFinal,
        "hasPdu": hasPdu,
        "tokenToId": tokenToId
});


const Lexer = require("./Lexer");
const Parser = require("./Parser");


require("colors");


export function getSerialPortParser(){

        const parseErrorDelay = 10000;

        let rawAtMessagesBuffer = "";
        let timer: NodeJS.Timer;
        let evtRawData= new SyncEvent<string>();

        type Main= (emitter: NodeJS.EventEmitter, buffer: Buffer)=> void;
        type Flush= ()=> string;

        let out: Main= function (emitter, buffer): void {

                rawAtMessagesBuffer += buffer.toString("utf8");

                evtRawData.post(rawAtMessagesBuffer);

                let atMessages: bl.AtMessage[];

                try {

                        atMessages = atMessagesParser(rawAtMessagesBuffer);

                } catch (error) {

                        let parserError = error as AtMessagesParserError;

                        if (!timer)
                                timer = setTimeout(() => {
                                        emitter.emit("data", null, rawAtMessagesBuffer);
                                        rawAtMessagesBuffer= "";
                                }, parseErrorDelay);

                        atMessages = parserError.urcMessages;

                        rawAtMessagesBuffer = parserError.leftToParse;

                }

                if (timer) clearTimeout(timer);

                rawAtMessagesBuffer = "";

                for( let atMessage of atMessages)
                        emitter.emit("data", atMessage, "");


        };

        (out as any).flush= function(){
                let out= rawAtMessagesBuffer;
                rawAtMessagesBuffer="";
                if( timer ) clearTimeout(timer);
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
                public readonly urcMessages: bl.AtMessage[],
                public readonly leftToParse: string
        ) {
                super(AtMessagesParserError.name);
                Object.setPrototypeOf(this, AtMessagesParserError.prototype)
        }

}

export function atMessagesParser(rawAtMessages: string): bl.AtMessage[] {

        let leftToParseAfterUrc = rawAtMessages;

        let output = {
                "leftToParse": rawAtMessages,
                "atMessages": [] as bl.AtMessage[],
                "bl": bl
        };

        try {

                if (rawAtMessages === "\r\nOK\r\n")
                        return [new bl.AtMessage("\r\nOK\r\n", bl.atIdDict.OK)];

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
                                if (!match) match = output.leftToParse.match(/^((?:[a-fA-F0-9]|\r\n)+)(?:$|\r\n\+CMGS)/);

                                if (match) {

                                        let atMessage = new bl.AtMessage(match[1], bl.atIdDict.ECHO);
                                        output.leftToParse = output.leftToParse.substring(atMessage.raw.length, output.leftToParse.length);
                                        output.atMessages.push(atMessage);

                                }

                                if (output.leftToParse === "\r\n> ") {
                                        output.atMessages.push(new bl.AtMessage(output.leftToParse, bl.atIdDict.INVITE));
                                        output.leftToParse = "";
                                }

                        }


                        if (!output.leftToParse) break;

                        let lexer = new Lexer();

                        lexer.bl = bl;

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
                        output.atMessages.push(new bl.AtMessage(
                                "\r\nOK\r\n",
                                bl.atIdDict.OK
                        ));

                        if (!raw) continue;
                        else {
                                if (!raw.match(/^\r\n(?:\r|\n|.)+\r\n$/))
                                        throw new Error("Malformed");

                                output.atMessages.push(new bl.AtMessage(raw));

                        }

                }


                return reorder(rawAtMessages, output.atMessages);

        } catch (originalError) {

                let urcMessages: bl.AtMessage[] = [];

                for (let atMessage of output.atMessages)
                        if (atMessage.isUnsolicited)
                                urcMessages.push(atMessage);

                throw new AtMessagesParserError(rawAtMessages, originalError, urcMessages, leftToParseAfterUrc);

        }

}



function reorder(
        rawAtMessages: string,
        atMessages: bl.AtMessage[]
): bl.AtMessage[] {

        let strMap: {
                [position: number]: string,
                extract: (str: string) => number
        } = ((str: string) => {

                let out = {} as any;

                Object.defineProperty(out, "extract", {
                        "enumerable": false,
                        value(str) {

                                let mapIndex = Object.keys(this).sort((a, b) => {
                                        return parseInt(a) < parseInt(b) ? -1 : 1;
                                });

                                mapRun: for (let iStr in mapIndex) {

                                        let i = parseInt(iStr);

                                        for (let j = 0; j < str.length; j++)
                                                if (this[mapIndex[i + j]] !== str[j])
                                                        continue mapRun;


                                        for (let j = 0; j < str.length; j++)
                                                delete this[mapIndex[i + j]];


                                        return mapIndex[i];

                                }

                                throw new Error(`Reorder error: ${JSON.stringify(str)} not found`);


                        }
                });

                for (let i = 0; i < str.length; i++)
                        out[i] = str[i];

                return out;

        })(rawAtMessages);

        let mapPositionAtMessage: {
                [pos: number]: bl.AtMessage;
        } = {};

        for (let atMessage of atMessages)
                mapPositionAtMessage[strMap.extract(atMessage.raw)] = atMessage;

        console.assert(Object.keys(strMap).length === 0);

        let atMessagesSorted: bl.AtMessage[] = [];

        for (let i of Object.keys(mapPositionAtMessage).sort(function (a, b) {
                return parseInt(a) < parseInt(b) ? -1 : 1;
        })) atMessagesSorted.push(mapPositionAtMessage[i]);

        console.assert(atMessagesSorted.length === atMessages.length);

        return atMessagesSorted;

}