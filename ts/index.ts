import { readFileSync } from "fs";

let Lexer = require("./Lexer");
let Parser = require("./Parser");

let parser = new Parser();
let lexer = new Lexer();

export enum AtMessageId {
        AT_COMMAND,
        OK, CONNECT, RING, NO_CARRIER, NO_DIALTONE, BUSY, NO_ANSWER, COMMAND_NOT_SUPPORT, TOO_MANY_PARAMETERS,
        ERROR, CME_ERROR, CMS_ERROR,
        BOOT, RSSI,
        CNUM, CMTI, CMGR, CPIN, SIMST, SRVST, CMEE
}

let atMessageUnsolicited: AtMessageId[] = [
        AtMessageId.BOOT,
        AtMessageId.RSSI,
        AtMessageId.SIMST,
        AtMessageId.SRVST
];


let atMessageFinal: AtMessageId[] = [
        AtMessageId.OK, 
        AtMessageId.CONNECT, 
        AtMessageId.RING, 
        AtMessageId.NO_CARRIER, 
        AtMessageId.NO_DIALTONE, 
        AtMessageId.BUSY, 
        AtMessageId.NO_ANSWER, 
        AtMessageId.COMMAND_NOT_SUPPORT,
        AtMessageId.TOO_MANY_PARAMETERS,
        AtMessageId.ERROR,
        AtMessageId.CME_ERROR,
        AtMessageId.CMS_ERROR
];

let atMessageError: AtMessageId[]= [
        AtMessageId.NO_CARRIER, 
        AtMessageId.NO_DIALTONE, 
        AtMessageId.BUSY, 
        AtMessageId.NO_ANSWER, 
        AtMessageId.COMMAND_NOT_SUPPORT,
        AtMessageId.TOO_MANY_PARAMETERS,
        AtMessageId.ERROR,
        AtMessageId.CME_ERROR,
        AtMessageId.CMS_ERROR

];



let getCmeErrorVerbose: (errorNo: number) => string = (() => {

        let cmeErrorDictionary = JSON.parse(readFileSync(__dirname + "/../cmeErrorDictionary.json", {
                "encoding": "utf8"
        }));

        return function getCmeErrorVerbose(errorNo: number): string {

                return cmeErrorDictionary[errorNo];

        };

})();


let getCmsErrorVerbose: (errorNo: number) => string = (() => {

        let cmsErrorDictionary = JSON.parse(readFileSync(__dirname + "/../cmsErrorDictionary.json", {
                "encoding": "utf8"
        }));

        return function getCmsErrorVerbose(errorNo: number): string {

                if (0 <= errorNo && errorNo <= 127) return cmsErrorDictionary["0-127"];
                if (128 <= errorNo && errorNo <= 255) return cmsErrorDictionary["128-255"];
                if (512 >= errorNo) return cmsErrorDictionary["512.."];

                let out: string = undefined;

                out = cmsErrorDictionary[errorNo];

                if (out === undefined) return "reserved"
                else return out

        };

})();


export class AtMessage {

        public isUnsolicited?: boolean;
        public isFinal?: boolean;
        public readonly idName?: string;
        public error?: AtMessageImplementations.ERROR | AtMessageImplementations.CME_ERROR | AtMessageImplementations.CMS_ERROR;
        public isError?: boolean;

        constructor(public readonly id: AtMessageId,
                public readonly raw: string
        ) {

                if (id !== undefined) this.idName = AtMessageId[id];

                if (atMessageUnsolicited.indexOf(id) > -1)
                        this.isUnsolicited = true;

                if (atMessageFinal.indexOf(id) > -1)
                        this.isFinal = true;

                if (atMessageError.indexOf(id) > -1)
                        this.isError = true;

        }

}

export enum MemStorage { SM, ME, ON, EN, FD }

export enum PinState { READY, SIM_PIN, SIM_PUK, SIM_PIN2, SIM_PUK2 }

export enum SimState {
        INVALID_SIM = 0,
        VALID_SIM = 1,
        INVALID_SIM_CS = 2,
        INVALID_SIM_PS = 3,
        INVALID_SIM_PS_CS = 4,
        ROM_SIM = 240,
        NO_SIM = 255
}

export enum ServiceStatus {
        NO_SERVICES = 0,
        RESTRICTED_SERVICES = 1,
        VALID_SERVICES = 2,
        RESTRICTED_REGIONAL_SERVICES = 3,
        POWER_SAVING_OR_HIBERNATE_STATE = 4
}

export enum ReportMode {
        NO_DEBUG_INFO= 0,
        DEBUG_INFO_CODE= 1,
        DEBUG_INFO_VERBOSE= 2
}

export namespace AtMessageImplementations {

        //\r\n+CMEE: 2\r\n
        export class CMEE extends AtMessage {
                public readonly reportModeName: string;
                constructor(raw: string,
                        public readonly reportMode: ReportMode) {
                        super(AtMessageId.CMEE, raw);

                        this.reportModeName = ReportMode[reportMode];
                }
        }

        //\r\n^SIMST: <sim_state>[,<lock_state>]\r\n
        export class SIMST extends AtMessage {

                public readonly simStateName: string;
                public readonly lock?: boolean;

                constructor(raw: string,
                        public readonly simState: SimState,
                        lock: boolean) {

                        super(AtMessageId.SIMST, raw);

                        this.simStateName = SimState[simState];

                        if (typeof (lock) === "boolean") this.lock = lock;

                }


        }

        //\r\n^SRVST: 0\r\n
        export class SRVST extends AtMessage {
                public readonly serviceStatusName: string;
                constructor(raw: string,
                        public readonly serviceStatus: ServiceStatus) {
                        super(AtMessageId.SRVST, raw);
                        this.serviceStatusName = ServiceStatus[serviceStatus];
                }
        }

        //\r\nERROR\r\n
        export class ERROR extends AtMessage {
                constructor(raw) {
                        super(AtMessageId.ERROR, raw);
                }
        }


        //\r\n+CME ERROR: 3\r\n
        export class CME_ERROR extends AtMessage {
                public readonly code: number;
                public readonly verbose: string;

                constructor(raw: string,
                        code?: number) {
                        super(AtMessageId.CME_ERROR, raw);
                        this.code = code;
                        this.verbose = getCmeErrorVerbose(code);
                }
        }

        //\r\n+CMS ERROR: 301\r\n
        export class CMS_ERROR extends AtMessage {
                public readonly code: number;
                public readonly verbose: string;

                constructor(raw: string,
                        code?: number) {
                        super(AtMessageId.CMS_ERROR, raw);
                        this.code = code;
                        this.verbose = getCmsErrorVerbose(code);
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
                                atMessage = new AtMessageImplementations.ERROR(raw);
                                break;
                        case AtMessageId.CME_ERROR:
                                let cmeErrorCode: number = atMessageDescriptor.code;
                                atMessage = new AtMessageImplementations.CME_ERROR(raw, cmeErrorCode);
                                break;
                        case AtMessageId.CMS_ERROR:
                                let cmsErrorCode: number = atMessageDescriptor.code;
                                atMessage = new AtMessageImplementations.CMS_ERROR(raw, cmsErrorCode);
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
                                atMessage = new AtMessageImplementations.CPIN(raw, pinState);
                                break;
                        case AtMessageId.SIMST:
                                let simState = <SimState>atMessageDescriptor.simState;
                                let lock = <boolean>atMessageDescriptor.lock;
                                atMessage = new AtMessageImplementations.SIMST(raw, simState, lock);
                                break;
                        case AtMessageId.SRVST:
                                let serviceStatus = <ServiceStatus>atMessageDescriptor.serviceStatus;
                                atMessage = new AtMessageImplementations.SRVST(raw, serviceStatus);
                                break;
                        case AtMessageId.CMEE:
                                let reportMode= <ReportMode>atMessageDescriptor.reportMode;
                                atMessage= new AtMessageImplementations.CMEE(raw, reportMode);
                                break;
                        default: atMessage = new AtMessage(id, raw);
                }


                if (atMessageDescriptor.error) {

                        let raw = atMessageDescriptor.error.raw;
                        let id = <AtMessageId>AtMessageId[<string>atMessageDescriptor.error.id];

                        switch (id) {
                                case AtMessageId.ERROR:
                                        atMessage.error = new AtMessageImplementations.ERROR(raw);
                                        break;
                                case AtMessageId.CME_ERROR:
                                        let cmeErrorCode: number = atMessageDescriptor.error.code;
                                        atMessage.error = new AtMessageImplementations.CME_ERROR(raw, cmeErrorCode);
                                        break;
                                case AtMessageId.CMS_ERROR:
                                        let cmsErrorCode: number = atMessageDescriptor.error.code;
                                        atMessage.error = new AtMessageImplementations.CMS_ERROR(raw, cmsErrorCode);
                                        break;
                                default:
                        }

                        delete atMessage.error.isFinal;

                }

                atMessages.push(atMessage);

        }

        return atMessages;

}