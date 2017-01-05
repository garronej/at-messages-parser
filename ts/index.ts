let Lexer = require("./Lexer");
let Parser = require("./Parser");

let parser = new Parser();
let lexer = new Lexer();

export enum AtMessageId {
        AT_COMMAND,
        OK,
        ERROR,
        BOOT,
        RSSI,
        CNUM,
        CMTI,
        CMGR,
        CPIN
}

export let atMessageUnsolicited: AtMessageId[] = [
        AtMessageId.BOOT,
        AtMessageId.RSSI
];

export class AtMessage {

        public hasError?: boolean;
        public errorCode?: number;
        public isUnsolicited?: boolean;
        public readonly idName?: string;

        constructor(public readonly id: AtMessageId,
                public readonly raw: string
        ) {

                if (id !== undefined) this.idName = AtMessageId[id];

                if (atMessageUnsolicited.indexOf(id) > -1)
                        this.isUnsolicited = true;

        }

        private setError(errorCode?: number) {

                this.hasError = true;

                if (errorCode !== undefined) {
                        this.errorCode = errorCode;
                }

        }

}

export enum MemStorage { SM, ME, ON, EN, FD }

export enum PinState { READY, SIM_PIN, SIM_PUK, SIM_PIN2, SIM_PUK2 }

export namespace AtMessageImplementations {

        //\r\nERROR\r\n
        //\r\n+CME ERROR: 3\r\n
        export class ERROR extends AtMessage {

                public readonly code?: number;

                constructor(raw: string,
                code?: number){
                        super(AtMessageId.ERROR, raw);
                        if(code !== undefined ){
                                this.code= code;
                        }
                }
        }

        // \r\n+CMGR: 0,,26\r\n07913306092069F0040B913336766883F5000061216232414440084EF289EC26BBC9\r\n\r\nOK\r\n
        export class CMGR extends AtMessage {

                constructor(raw: string,
                        public readonly stat: number,
                        public readonly length: number,
                        public readonly pdu: string, ) {

                        super(AtMessageId.CMGR, raw);
                }

        }

        //\r\n+CMTI: "SM",29\r\n'
        export class CMTI extends AtMessage {

                public readonly memName: string;

                constructor(raw: string,
                        public readonly mem: MemStorage,
                        public readonly index: number) {

                        super(AtMessageId.CMTI, raw);

                        this.memName = MemStorage[mem];
                }

        }

        //\r\nERROR+CNUM: "","+393701307294",145\r\n\r\n
        //\r\n+CNUM: "CC","+8613987654321",129\r\n
        export class CNUM extends AtMessage {

                constructor(raw: string,
                        public readonly alpha: string,
                        public readonly number: string,
                        public readonly isNational: boolean) {

                        super(AtMessageId.CNUM, raw);
                }
        }

        //\r\n+CPIN: SIM PIN\r\n
        //\r\n+CPIN: READY\r\n
        export class CPIN extends AtMessage {

                public readonly pinStateName: string;

                constructor(raw: string,
                        public readonly pinState: PinState) {

                        super(AtMessageId.CPIN, raw);
                        this.pinStateName = PinState[pinState];

                }
        }


}


export function atMessagesParser(input: string): AtMessage[] {

        lexer.setInput(input);

        let output: any = {};

        try {

                parser.parse(lexer, output);

        } catch (error) {

                throw new Error(error.message);

        }

        let atMessages: AtMessage[] = [];

        if (output.echo !== undefined) {

                atMessages.push(new AtMessage(AtMessageId.AT_COMMAND, <string>output.echo));

        }

        let atMessageDescriptors: any[] = output.atMessageDescriptors;

        for (let atMessageDescriptor of atMessageDescriptors) {

                let id = <AtMessageId>AtMessageId[<string>atMessageDescriptor.id];
                let raw: string = atMessageDescriptor.raw;
                let atMessage: AtMessage;

                switch (id) {
                        case AtMessageId.ERROR:
                                let code: number = atMessageDescriptor.code;
                                atMessage = new AtMessageImplementations.ERROR(raw, code);
                                break;
                        case AtMessageId.CMGR:
                                let stat: number = atMessageDescriptor.stat;
                                let length: number = atMessageDescriptor.length;
                                let pdu: string = atMessageDescriptor.pdu;
                                atMessage = new AtMessageImplementations.CMGR(raw, stat, length, pdu);
                                break;
                        case AtMessageId.CMTI:
                                let mem = <MemStorage>MemStorage[<string>atMessageDescriptor.mem];
                                let index: number = atMessageDescriptor.index;
                                atMessage = new AtMessageImplementations.CMTI(raw, mem, index);
                                break;
                        case AtMessageId.CNUM:
                                let alpha: string = atMessageDescriptor.alpha;
                                let number: string = atMessageDescriptor.number;
                                let isNational: boolean = atMessageDescriptor.isNational;
                                let hasError: boolean = atMessageDescriptor.hasError;
                                atMessage = new AtMessageImplementations.CNUM(raw, alpha, number, isNational);
                                break;
                        case AtMessageId.CPIN:
                                let pinState = <PinState>PinState[<string>atMessageDescriptor.pinState];
                                atMessage= new AtMessageImplementations.CPIN(raw, pinState);
                                break;
                        default: atMessage = new AtMessage(id, raw);
                }

                if (atMessageDescriptor.hasError) {

                        (<any>atMessage).setError(atMessageDescriptor.errorCode);

                }

                atMessages.push(atMessage);

        }

        return atMessages;

}
