import { readFileSync } from "fs";

let Lexer = require("./Lexer");
let Parser = require("./Parser");

let parser = new Parser();
let lexer = new Lexer();

export enum AtMessageId {
        ECHO, 
        AT_LIST,
        OK, CONNECT, RING, NO_CARRIER, NO_DIALTONE, BUSY, NO_ANSWER, COMMAND_NOT_SUPPORT, TOO_MANY_PARAMETERS,
        INVITE,
        ERROR, CME_ERROR, CMS_ERROR,
        CNUM, CMGR, CMTI, CPIN, CMEE, CMGL,
        HUAWEI_BOOT, HUAWEI_RSSI, HUAWEI_SIMST, HUAWEI_SRVST, HUAWEI_CPIN, HUAWEI_SYSINFO
}

let atMessageUnsolicited: AtMessageId[] = [
        AtMessageId.HUAWEI_BOOT,
        AtMessageId.HUAWEI_RSSI,
        AtMessageId.HUAWEI_SIMST,
        AtMessageId.HUAWEI_SRVST
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
        AtMessageId.CMS_ERROR,
        AtMessageId.INVITE
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

let cmeErrorDictionary = JSON.parse(readFileSync(__dirname + "/../../res/cmeErrorDictionary.json", {
                "encoding": "utf8"
        }));

        return function getCmeErrorVerbose(errorNo: number): string {

                return cmeErrorDictionary[errorNo];

        };

})();


let getCmsErrorVerbose: (errorNo: number) => string = (() => {

let cmsErrorDictionary = JSON.parse(readFileSync(__dirname + "/../../res/cmsErrorDictionary.json", {
                "encoding": "utf8"
        }));

        return function getCmsErrorVerbose(errorNo: number): string {

                if (0 <= errorNo && errorNo <= 127) return cmsErrorDictionary["0-127"];
                if (128 <= errorNo && errorNo <= 255) return cmsErrorDictionary["128-255"];
                if ( 512 <= errorNo ) return cmsErrorDictionary["512.."];

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

        public get id(): AtMessageId{
                return this.__id__;
        }

        constructor(private readonly __id__: AtMessageId,
                public readonly raw: string
        ) {

                Object.defineProperty(this, "__id__", { "enumerable": false });

                if ( typeof(this.id) === "number" ) this.idName = AtMessageId[this.id];

                if (atMessageUnsolicited.indexOf(this.id) > -1)
                        this.isUnsolicited = true;

                if (atMessageFinal.indexOf(this.id) > -1)
                        this.isFinal = true;

                if (atMessageError.indexOf(this.id) > -1)
                        this.isError = true;

        }

}

export class AtMessageList extends AtMessage {

        public readonly atMessages: AtMessage[] = [];

        constructor(raw: string, atMessageDescriptors: any[]) {

                super(AtMessageId.AT_LIST, raw);

                for (let atMessageDescriptor of atMessageDescriptors)
                        this.atMessages.push(descriptorToInstance(atMessageDescriptor));

        }
}

export enum MemStorage { SM, ME, ON, EN, FD }

export enum PinState { READY, SIM_PIN, SIM_PUK, SIM_PIN2, SIM_PUK2 }

export enum ServiceStatus {
        NO_SERVICES = 0,
        RESTRICTED_SERVICES = 1,
        VALID_SERVICES = 2,
        RESTRICTED_REGIONAL_SERVICES = 3,
        POWER_SAVING_OR_HIBERNATE_STATE = 4
}

export enum ServiceDomain {
        NO_SERVICES = 0,
        ONLY_CS_SERVICES = 1,
        ONLY_PS_SERVICES = 2,
        PS_AND_CS_SERVICES = 3,
        CS_AND_PS_NOT_REGISTERED_SEARCHING = 4
}

export enum SysMode {
        NO_SERVICES = 0,
        AMPS = 1,
        CDMA = 2,
        GSM_GPRS = 3,
        HDR = 4,
        WCDMA = 5,
        GPS = 6
}

export enum SimState {
        INVALID_SIM = 0,
        VALID_SIM = 1,
        INVALID_SIM_CS = 2,
        INVALID_SIM_PS = 3,
        INVALID_SIM_PS_CS = 4,
        ROM_SIM = 240,
        NO_SIM = 255
}

export enum ReportMode {
        NO_DEBUG_INFO = 0,
        DEBUG_INFO_CODE = 1,
        DEBUG_INFO_VERBOSE = 2
}


export enum MessageStat {
        RECEIVED_UNREAD= 0,
        RECEIVED_READ= 1,
        STORED_UNSENT= 2,
        STORED_SENT= 3,
        ALL= 4
}

export namespace AtMessageImplementations {

        //+CMEE: 2
        export class CMEE extends AtMessage {
                public readonly reportModeName: string;
                constructor(raw: string,
                        public readonly reportMode: ReportMode) {
                        super(AtMessageId.CMEE, raw);

                        this.reportModeName = ReportMode[reportMode];
                }
        }

        //^SIMST: <sim_state>[,<lock_state>]
        export class HUAWEI_SIMST extends AtMessage {

                public readonly simStateName: string;
                public readonly lock?: boolean;

                constructor(raw: string,
                        public readonly simState: SimState,
                        lock: boolean) {

                        super(AtMessageId.HUAWEI_SIMST, raw);

                        this.simStateName = SimState[simState];

                        if (typeof (lock) === "boolean") this.lock = lock;

                }

        }

        //^SRVST: 0
        export class HUAWEI_SRVST extends AtMessage {
                public readonly serviceStatusName: string;
                constructor(raw: string,
                        public readonly serviceStatus: ServiceStatus) {
                        super(AtMessageId.HUAWEI_SRVST, raw);
                        this.serviceStatusName = ServiceStatus[serviceStatus];
                }
        }

        //ERROR
        export class ERROR extends AtMessage {
                constructor(raw) {
                        super(AtMessageId.ERROR, raw);
                }
        }


        //+CME ERROR: 3
        export class CME_ERROR extends AtMessage {
                public readonly code: number;
                public readonly verbose: string;

                constructor(raw: string,
                        code: number) {
                        super(AtMessageId.CME_ERROR, raw);
                        this.code = code;
                        this.verbose = getCmeErrorVerbose(code);
                }
        }

        //+CMS ERROR: 301
        export class CMS_ERROR extends AtMessage {
                public readonly code: number;
                public readonly verbose: string;

                constructor(raw: string,
                        code: number) {
                        super(AtMessageId.CMS_ERROR, raw);
                        this.code = code;

                        this.verbose = getCmsErrorVerbose(code);
                }
        }

        //+CMGR: 0,,26\r\n07913306092069F0040B913336766883F5000061216232414440084EF289EC26BBC9\r\n
        export class CMGR extends AtMessage {

                public readonly statName: string;

                constructor(raw: string,
                        public readonly stat: MessageStat,
                        public readonly length: number,
                        public readonly pdu: string, ) {

                        super(AtMessageId.CMGR, raw);

                        this.statName= MessageStat[stat];
                }

        }

        //+CMTI: "SM",29
        export class CMTI extends AtMessage {

                public readonly memName: string;

                public get mem(): MemStorage {
                        return this.__mem__;
                }

                constructor(raw: string,
                        private readonly __mem__: MemStorage,
                        public readonly index: number) {

                        super(AtMessageId.CMTI, raw);

                        Object.defineProperty(this, "__mem__", { "enumerable": false });

                        this.memName = MemStorage[this.mem];
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

                public get pinState(): PinState {
                        return this.__pinState__;
                }

                constructor(raw: string,
                        private readonly __pinState__: PinState) {

                        super(AtMessageId.CPIN, raw);

                        Object.defineProperty(this, "__pinState__", { "enumerable": false });

                        this.pinStateName = PinState[this.pinState];

                }
        }

        // \r\n^CPIN: SIM PIN,3,10,3,10,3\r\n
        // \r\n^CPIN: READY,,10,3,10,3\r\n
        export class HUAWEI_CPIN extends AtMessage {

                public readonly pinStateName: string;

                public get pinState(): PinState { return this.__pinState__; }

                //<code>,[<times>],<puk_times>,<pin_times>,<puk2_times>,<pin2_ti mes><
                constructor(raw: string,
                        private readonly __pinState__: PinState,
                        public readonly times: number,
                        public readonly pukTimes: number,
                        public readonly pinTimes: number,
                        public readonly puk2Times: number,
                        public readonly pin2Times: number) {

                        super(AtMessageId.HUAWEI_CPIN, raw);

                        Object.defineProperty(this, "__pinState__", { "enumerable": false });

                        this.pinStateName = PinState[this.pinState];
                }

        }

        export class HUAWEI_SYSINFO extends AtMessage {
                public readonly serviceStatusName: string;
                public readonly serviceDomainName: string;
                public readonly sysModeName: string;
                public readonly simStateName: string;
                constructor(raw: string,
                        public readonly serviceStatus: ServiceStatus,
                        public readonly serviceDomain: ServiceDomain,
                        public readonly isRoaming: boolean,
                        public readonly sysMode: SysMode,
                        public readonly simState: SimState) {
                        super(AtMessageId.HUAWEI_SYSINFO, raw);

                        this.serviceStatusName = ServiceStatus[serviceStatus];
                        this.serviceDomainName = ServiceDomain[serviceDomain];
                        this.sysModeName = SysMode[sysMode];
                        this.simStateName = SimState[simState];

                }
        }

        //\r\n+CMGL: 0,1,,22\r\n07913306092049F0040B913336766883F500007110811094904003CF7A1A

        export class CMGL extends AtMessage {

                public readonly statName: string;

                constructor( raw: string,
                public readonly index: number,
                public readonly stat: MessageStat,
                public readonly length: number,
                public readonly pdu: string){
                        super(AtMessageId.CMGL, raw);

                        this.statName= MessageStat[stat];
                }
        }


}

function parseBasic(input: string, output: any): boolean {

        output.atMessageDescriptors = [];

        let match = input.match(/^(AT.*\r)?((?:.|[\r\n])*)\r\nOK\r\n$/);

        if (match) {

                if (match[1]) {
                        output.atMessageDescriptors.push({
                                "id": "ECHO",
                                "raw": match[1]
                        });
                }

                output.atMessageDescriptors.push({
                        "raw": match[2]
                });

                output.atMessageDescriptors.push({
                        "id": "OK",
                        "raw": "\r\nOK\r\n"
                });

                return true;

        }

        match = input.match(/(?:\r\n)?(?:[a-fA-F0-9]+)?$/);

        if (input && match) {

                output.atMessageDescriptors.push({
                        "id": "ECHO",
                        "raw": input
                });

                return true;

        }

        return false;


}

export function atMessagesParser(input: string): AtMessage[] {

        lexer.setInput(input);

        let output: any = {};

        try {

                parser.parse(lexer, output);

        } catch (error) {

                if (!parseBasic(input, output)) throw new Error(error.message);

        }

        let atMessages: AtMessage[] = [];

        for (let atMessageDescriptor of output.atMessageDescriptors)
                atMessages.push(descriptorToInstance(atMessageDescriptor));

        return atMessages;

}

function descriptorToInstance(atMessageDescriptor: any): AtMessage {

        let id = <AtMessageId>AtMessageId[<string>atMessageDescriptor.id];
        let raw: string = atMessageDescriptor.raw;
        let atMessage: AtMessage;

        switch (id) {
                case AtMessageId.AT_LIST:
                        let atMessageDescriptors = <any[]>atMessageDescriptor.atMessageDescriptors;
                        atMessage = new AtMessageList(raw, atMessageDescriptors);
                        break;
                case AtMessageId.ERROR:
                        atMessage = new AtMessageImplementations.ERROR(raw);
                        break;
                case AtMessageId.CME_ERROR:
                        let cmeErrorCode = <number>atMessageDescriptor.code;
                        atMessage = new AtMessageImplementations.CME_ERROR(raw, cmeErrorCode);
                        break;
                case AtMessageId.CMS_ERROR:
                        let cmsErrorCode = <number>atMessageDescriptor.code;
                        atMessage = new AtMessageImplementations.CMS_ERROR(raw, cmsErrorCode);
                        break;
                case AtMessageId.CMGR:
                        let stat = <MessageStat>atMessageDescriptor.stat;
                        let length = <number>atMessageDescriptor.length;
                        let pdu = <string>atMessageDescriptor.pdu;
                        atMessage = new AtMessageImplementations.CMGR(raw, stat, length, pdu);
                        break;
                case AtMessageId.CMTI:
                        let mem = <MemStorage>MemStorage[<string>atMessageDescriptor.mem];
                        let index = <number>atMessageDescriptor.index;
                        atMessage = new AtMessageImplementations.CMTI(raw, mem, index);
                        break;
                case AtMessageId.CNUM:
                        let alpha = <string>atMessageDescriptor.alpha;
                        let number = <string>atMessageDescriptor.number;
                        let isNational = <boolean>atMessageDescriptor.isNational;
                        let hasError = <boolean>atMessageDescriptor.hasError;
                        atMessage = new AtMessageImplementations.CNUM(raw, alpha, number, isNational);
                        break;
                case AtMessageId.CPIN:
                        let pinState = <PinState>PinState[<string>atMessageDescriptor.pinState];
                        atMessage = new AtMessageImplementations.CPIN(raw, pinState);
                        break;
                case AtMessageId.HUAWEI_SIMST:
                        let simState = <SimState>atMessageDescriptor.simState;
                        let lock = <boolean>atMessageDescriptor.lock;
                        atMessage = new AtMessageImplementations.HUAWEI_SIMST(raw, simState, lock);
                        break;
                case AtMessageId.HUAWEI_SRVST:
                        let serviceStatus = <ServiceStatus>atMessageDescriptor.serviceStatus;
                        atMessage = new AtMessageImplementations.HUAWEI_SRVST(raw, serviceStatus);
                        break;
                case AtMessageId.CMEE:
                        let reportMode = <ReportMode>atMessageDescriptor.reportMode; atMessage = new AtMessageImplementations.CMEE(raw, reportMode);
                        break;
                case AtMessageId.HUAWEI_CPIN:
                        pinState = <PinState>PinState[<string>atMessageDescriptor.pinState];
                        let times = <number>atMessageDescriptor.times;
                        let pukTimes = <number>atMessageDescriptor.pukTimes;
                        let pinTimes = <number>atMessageDescriptor.pinTimes;
                        let puk2Times = <number>atMessageDescriptor.puk2Times;
                        let pin2Times = <number>atMessageDescriptor.pin2Times;
                        atMessage = new AtMessageImplementations.HUAWEI_CPIN(raw, pinState, times, pukTimes, pinTimes, puk2Times, pin2Times);
                        break;
                case AtMessageId.HUAWEI_SYSINFO:
                        serviceStatus = <ServiceStatus>atMessageDescriptor.serviceStatus;
                        let serviceDomain = <ServiceDomain>atMessageDescriptor.serviceDomain;
                        let isRoaming = <boolean>atMessageDescriptor.isRoaming;
                        let sysMode = <SysMode>atMessageDescriptor.sysMode;
                        simState = <SimState>atMessageDescriptor.simState;
                        atMessage = new AtMessageImplementations.HUAWEI_SYSINFO(raw, serviceStatus, serviceDomain, isRoaming, sysMode, simState);
                        break;
                case AtMessageId.CMGL:
                        index = <number>atMessageDescriptor.index;
                        stat = <MessageStat>atMessageDescriptor.stat;
                        length = <number>atMessageDescriptor.length;
                        pdu = <string>atMessageDescriptor.pdu;
                        atMessage = new AtMessageImplementations.CMGL(raw, index, stat, length, pdu);
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

        return atMessage;

}
