export * from "./AtMessage";

import { AtMessageId, AtMessage } from "./AtMessage";
import { descriptorToInstance, AtMessageDescriptor } from "./descriptorToInstance";
const Lexer = require("./Lexer");
const Parser = require("./Parser");
require("colors");

export function atMessagesParser(input: string): AtMessage[] {

        let atMessages: AtMessage[] = [];

        for (let atMessageDescriptor of rawToDescriptors(input))
                atMessages.push(descriptorToInstance(atMessageDescriptor));

        return atMessages;

}

function rawToDescriptors(rawAtMessages: string): AtMessageDescriptor[] {

        let input = { "leftToParse": rawAtMessages };
        let output = { "atMessageDescriptors": [] };

        while (true) {
                let countBefore= output.atMessageDescriptors.length;
                runParser(parseJacob, input, output);
                /*
                console.log("after parseJacob".cyan, {
                        "leftToParse": input.leftToParse,
                        "atMessageDescriptors": output.atMessageDescriptors
                });
                */
                if (!input.leftToParse.length) break;
                runParser(parseAlt, input, output);
                /*
                console.log("after parseAlt".green, {
                        "leftToParse": input.leftToParse,
                        "atMessageDescriptors": output.atMessageDescriptors
                });
                */
                if (!input.leftToParse.length) break;
                if( countBefore === output.atMessageDescriptors.length) throw new Error("parsing failed");
        }

        return output.atMessageDescriptors;
}


function runParser(
        parser: (rawAtMessages: string, output: { atMessageDescriptors: AtMessageDescriptor[] }) => void,
        input: { leftToParse: string },
        output: { atMessageDescriptors: AtMessageDescriptor[] }) {

        let lengthBefore = input.leftToParse.length;
        let parseError = new Error();

        let atMessageCountBefore = output.atMessageDescriptors.length;

        try {

                parser(input.leftToParse, output);

                input.leftToParse = "";

        } catch (error) {

                let rawParsed = "";

                for (let i = atMessageCountBefore; i < output.atMessageDescriptors.length; i++)
                        rawParsed += output.atMessageDescriptors[i].raw;


                input.leftToParse = input.leftToParse.substring(rawParsed.length, input.leftToParse.length);

        }


}


function parseJacob(rawAtMessages: string, output: { atMessageDescriptors: AtMessageDescriptor[] }): void {

        let parser = new Parser();
        let lexer = new Lexer();

        lexer.setInput(rawAtMessages);

        parser.parse(lexer, output);


}

function parseAlt(rawAtMessages: string, output: { atMessageDescriptors: AtMessageDescriptor[] }): void {

        let regExp_id_Array: [RegExp, AtMessageId][] = [
                [/^([a-fA-F0-9]+)/, "ECHO"],
                [/^(\r\n(?:.|\r\n)+\r\n)\r\nOK\r\n/, undefined],
                [/^(\r\n)/, "ECHO"]
        ];

        for (let regExp_id of regExp_id_Array) {

                let regExp = regExp_id[0];
                let id = regExp_id[1];

                let match = rawAtMessages.match(regExp);

                if (match) {

                        output.atMessageDescriptors.push({
                                "id": id,
                                "raw": match[1]
                        });

                        if (match[1].length !== rawAtMessages.length) throw new Error("Left to parse");

                        return;

                }


        }

        throw new Error("Nothing matched");


}

