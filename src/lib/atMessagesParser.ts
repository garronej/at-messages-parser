import * as bl from "./businessLogic/index";

import {
        isUnso,
        isFinal,
        hasPdu,
        tokenToId
} from "./businessLogic/AtMessage";

Object.assign(bl, {
        "isUnso": isUnso,
        "isFinal": isFinal,
        "hasPdu": hasPdu,
        "tokenToId": tokenToId
});


const Lexer = require("./Lexer");
const Parser = require("./Parser");


require("colors");

export function atMessagesParser(rawAtMessages: string): bl.AtMessage[] {

        if (rawAtMessages === "\r\nOK\r\n")
                return [new bl.AtMessage("\r\nOK\r\n", bl.atIdDict.OK)];

        let parser = new Parser();

        let output = {
                "leftToParse": rawAtMessages,
                "atMessages": [] as bl.AtMessage[],
                "bl": bl
        }

        for (let phase of [
                "UNSO",
                "RESP",
                "LIST_CMGL",
                "LIST_CNUM",
                "FINAL"
        ]) {

                if (phase === "RESP") {

                        switch (output.leftToParse) {
                                case "\r\n":
                                        output.atMessages.push(new bl.AtMessage(
                                                output.leftToParse,
                                                bl.atIdDict.ECHO
                                        ));
                                        output.leftToParse = "";
                                        break;
                                case "ATE0\r\r\nOK\r\n":
                                        output.atMessages.push(new bl.AtMessage(
                                                "ATE0\r",
                                                bl.atIdDict.ECHO,
                                        ));
                                        output.atMessages.push(new bl.AtMessage(
                                                "\r\nOK\r\n",
                                                bl.atIdDict.OK
                                        ));
                                        output.leftToParse = "";
                                        break;
                                case "ATE0\r":
                                        output.atMessages.push(new bl.AtMessage(
                                                output.leftToParse,
                                                bl.atIdDict.ECHO
                                        ));
                                        output.leftToParse = "";
                                        break;
                                case "\r\n> ":
                                        output.atMessages.push(new bl.AtMessage(
                                                output.leftToParse,
                                                bl.atIdDict.INVITE
                                        ));
                                        output.leftToParse = "";
                                        break;
                                default:
                        }

                }

                if (!output.leftToParse) break;

                let lexer = new Lexer();

                lexer.bl = bl;

                lexer.setInput(output.leftToParse);

                output.leftToParse = "";

                lexer.pushState(phase);

                parser.parse(lexer, output);

                /*
                console.log(`End ${phase}`.blue);
                console.log(`LeftToParse: \n${JSON.stringify(output.leftToParse)}`.blue);
                console.log(`atMessages: \n${JSON.stringify(output.atMessages,null,2)}`.green);
                */

        }

        let split = output.leftToParse.split("\r\nOK\r\n");

        if (split[split.length - 1]) throw new Error();

        for (let i = 0; i < split.length - 1; i++) {

                let raw = split[i];
                output.atMessages.push(new bl.AtMessage(
                        "\r\nOK\r\n",
                        bl.atIdDict.OK
                ));

                if (!raw) continue;
                else {
                        if (!raw.match(/^\r\n(?:\r|\n|.)+\r\n$/))
                                throw new Error();

                        output.atMessages.push(new bl.AtMessage(raw));

                }

        }

        return reorder(rawAtMessages, output.atMessages);

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