
let Lexer= require("./Lexer");
let Parser= require("./Parser");

let parser= new Parser();
let lexer= new Lexer();


export enum AtMessageId {
        ECHO,
        OK,
        ERROR,
        BOOT,
        RSSI,
        CNUM,
        OTHER
}


export interface AtMessage {
        raw: string;
        id: AtMessageId;
        hasError?: boolean;
}

export default function parse(input: string): [string,AtMessage[]] {

        lexer.setInput(input);

        let output = { "res": undefined };

        try {

                parser.parse(lexer, output);

        } catch (error) {


                throw new Error("malformed");

        }

        let concatRaw= "";

        for(let atMessage of output.res ){

                concatRaw+= atMessage.raw;

                atMessage.id= <AtMessageId>AtMessageId[<string>atMessage.id];

        }

        return [concatRaw, output.res];

}