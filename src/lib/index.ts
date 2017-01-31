export * from "./AtMessage";

import * as defs from "./AtMessage";

const Lexer = require("./Lexer");
const Parser = require("./Parser");
require("colors");


export function atMessagesParser(rawAtMessages: string): defs.AtMessage[] {

        let parser= new Parser();

        let output= {
                "leftToParse": rawAtMessages,
                "atMessages": [] as defs.AtMessage[],
                "defs": defs
        }

        for (let phase of ["UNSOLICITED", "REGULAR"]) {

                let lexer = new Lexer();

                lexer.defs = defs;

                lexer.pushState(phase);

                lexer.setInput(output.leftToParse);

                output.leftToParse= "";

                parser.parse(lexer, output);

        }

        if (output.leftToParse)
                throw new Error(`Left to parse: ${JSON.stringify(output.leftToParse)}`);

        return output.atMessages;

}




