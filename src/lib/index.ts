export * from "./AtMessage";

import * as defs from "./AtMessage";

const Lexer = require("./Lexer");
const Parser = require("./Parser");
require("colors");


export function atMessagesParser(rawAtMessages: string): defs.AtMessage[] {

        if( rawAtMessages === "\r\nOK\r\n" )
                return [ new defs.AtMessage(defs.atIds.OK, "\r\nOK\r\n") ];
        

        let parser = new Parser();

        let output = {
                "leftToParse": rawAtMessages,
                "atMessages": [] as defs.AtMessage[],
                "defs": defs
        }

        for (let phase of [
                "UNSO",
                "RESP",
                "LIST_CNUM",
                "LIST_CMGL",
                "FINAL"
        ]) {

                if (!output.leftToParse) break;

                //console.log(`Phase ${phase}`.green);

                let lexer = new Lexer();

                lexer.defs = defs;

                lexer.setInput(output.leftToParse);

                output.leftToParse = "";

                lexer.pushState(phase);

                parser.parse(lexer, output);

                /*
                console.log(`End ${phase}`.blue, {
                        "leftToParse": output.leftToParse,
                        "atMessages": output.atMessages
                });
                */

        }

        let split = output.leftToParse.split("\r\nOK\r\n");

        if (split[split.length - 1]) throw new Error();

        for (let i = 0; i < split.length - 1; i++) {

                let raw = split[i];
                output.atMessages.push(new defs.AtMessage(defs.atIds.OK, "\r\nOK\r\n"));

                if (!raw) continue;
                else {
                        if (!raw.match(/^\r\n(?:\r|\n|.)+\r\n$/))
                                throw new Error();

                        output.atMessages.push(new defs.AtMessage(undefined, raw));

                }

        }

        return reorder(rawAtMessages, output.atMessages);

}



function reorder(
        rawAtMessages: string,
        atMessages: defs.AtMessage[]
): defs.AtMessage[] {

        let strMap: {
                [position: number]: string,
                extract: (str: string) => number
        } = ((str: string) => {

                let out = {} as any;

                Object.defineProperty(out, "extract", {
                        "enumerable": false,
                        "value": function (str) {

                                let mapIndex = Object.keys(this).sort((a, b) => {
                                        return parseInt(a) < parseInt(b) ? -1 : 1;
                                });

                                mapRun: for (let iStr of mapIndex) {

                                        let i = parseInt(iStr);

                                        for (let j = 0; j < str.length; j++)
                                                if (this[i + j] !== str[j])
                                                        continue mapRun;

                                        for (let j = i; j < i + str.length; j++)
                                                delete this[j];

                                        return i;

                                }

                                return undefined;
                        }
                });

                for (let i = 0; i < str.length; i++)
                        out[i] = str[i];

                return out;

        })(rawAtMessages);

        let mapPositionAtMessage = {};

        for (let i = 0; i < atMessages.length; i++)
                mapPositionAtMessage[strMap.extract(atMessages[i].raw)] = atMessages[i];

        let atMessagesSorted = [];

        for (let i of Object.keys(mapPositionAtMessage).sort(function (a, b) {
                return parseInt(a) < parseInt(b) ? -1 : 1;
        })) atMessagesSorted.push(mapPositionAtMessage[i]);

        return atMessagesSorted;

}

