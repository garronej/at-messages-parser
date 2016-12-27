let Lexer= require("./Lexer");
let Parser= require("./Parser");

let parser= new Parser();
let lexer= new Lexer();

export enum AtMessageId {
        COMMAND_ECHO,
        OK,
        ERROR,
        BOOT,
        RSSI,
        CNUM,
        CMTI,
        CMGR
}

export enum AtMessageIdUnsolicited {
        BOOT = AtMessageId.BOOT,
        RSSI = AtMessageId.RSSI,
        CMTI = AtMessageId.CMTI
}

export enum MemStorage {
        SM,
        ME,
        ON,
        EN,
        FD
}

export class AtMessage {

        constructor(public readonly id: AtMessageId,
                public readonly raw: string,
                public readonly isUnsolicited: boolean) { }

}

// \r\n+CMGR: 0,,26\r\n07913306092069F0040B913336766883F5000061216232414440084EF289EC26BBC9\r\n\r\nOK\r\n

export class AtMessageCMGR extends AtMessage {

        constructor(raw: string,
                public readonly stat: number,
                public readonly length: number,
                public readonly pdu: string) {

                super(AtMessageId.CMGR, raw, false);

        }

}

//message received { raw: '\r\n+CMTI: "SM",29\r\n', id: 6 }

export class AtMessageCMTI extends AtMessage {

        constructor(raw: string,
                public readonly mem: MemStorage,
                public readonly index: number) {

                super(AtMessageId.CMTI, raw, true);

        }

}


//'\r\nERROR+CNUM: "","+393701307294",145\r\n\r\n',
//'\r\n+CNUM: "CC","+8613987654321",129\r\n',

export class AtMessageCNUM extends AtMessage {

        constructor(raw: string,
                public readonly alpha: string,
                public readonly number: string,
                public readonly isNational: boolean,
                public readonly hasError: boolean = false) {

                super(AtMessageId.CNUM, raw, false);
        }
}


export default function parse(input: string): AtMessage[] {

        lexer.setInput(input);

        let output = { "res": undefined };

        try {

                parser.parse(lexer, output);

        } catch (error) {

                throw new Error("malformed");

        }

        let atMessages: AtMessage[] = [];

        for (let atMessageDescriptor of output.res) {

                let id = <AtMessageId>AtMessageId[<string>atMessageDescriptor.id];
                let raw: string = atMessageDescriptor.raw;

                switch (id) {
                        case AtMessageId.CMGR:
                                let stat: number = atMessageDescriptor.stat;
                                let length: number = atMessageDescriptor.length;
                                let pdu: string = atMessageDescriptor.pdu;
                                atMessages.push(new AtMessageCMGR(raw, stat, length, pdu));
                                break;
                        case AtMessageId.CMTI:
                                let mem = <MemStorage>MemStorage[<string>atMessageDescriptor.mem];
                                let index: number = atMessageDescriptor.index;
                                atMessages.push(new AtMessageCMTI(raw, mem, index));
                                break;
                        case AtMessageId.CNUM:
                                let alpha: string= atMessageDescriptor.alpha;
                                let number: string= atMessageDescriptor.number;
                                let isNational: boolean= atMessageDescriptor.isNational;
                                let hasError: boolean= atMessageDescriptor.hasError;
                                atMessages.push(new AtMessageCNUM(raw, alpha, number, isNational, hasError));
                                break;
                        default:
                                let isUnsolicited: boolean;
                                if (AtMessageIdUnsolicited[id]) {
                                        isUnsolicited = true;
                                } else {
                                        isUnsolicited = undefined;
                                }
                                atMessages.push(new AtMessage(id, raw, isUnsolicited));
                }

        }

        return atMessages;
}