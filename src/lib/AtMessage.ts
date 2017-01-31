import { getCmeErrorVerbose, getCmsErrorVerbose } from "./errorVerbose";
import { descriptorToInstance } from "./descriptorToInstance";

export type AtMessageId =
        "ECHO" |
        "AT LIST" |
        "OK" | "CONNECT" | "RING" | "NO CARRIER" | "NO DIALTONE" | "BUSY" | "NO ANSWER" | "COMMAND NOT SUPPORT" | "TOO MANY PARAMETERS" |
        ">" |
        "ERROR" | "+CME ERROR" | "+CMS ERROR" |
        "+CNUM" | "+CMGR" | "+CMTI" | "+CPIN" | "+CMEE" | "+CMGL" | "+CDSI" | "+CDS" | "+CMT" | "+CMGS" | "+CPBS" | "+CPBR" | "+CPBR TEST" |
        "^BOOT" | "^RSSI" | "^SIMST" | "^SRVST" | "^CPIN" | "^SYSINFO" | "^MODE";

export let atIds = {
        "ECHO": "ECHO" as AtMessageId,
        "AT_LIST": "AT LIST" as AtMessageId,

        "OK": "OK" as AtMessageId, 
        "CONNECT": "CONNECT" as AtMessageId, 
        "RING": "RING" as AtMessageId, 
        "NO_CARRIER": "NO CARRIER" as AtMessageId, 
        "NO_DIALTONE": "NO DIALTONE" as AtMessageId,
        "BUSY": "BUSY" as AtMessageId, 
        "NO_ANSWER": "NO ANSWER" as AtMessageId, 
        "COMMAND_NOT_SUPPORT": "COMMAND NOT SUPPORT" as AtMessageId, 
        "TOO_MANY_PARAMETERS": "TOO MANY PARAMETERS" as AtMessageId,

        "INVITE": ">" as AtMessageId,
        "ERROR" : "ERROR" as AtMessageId, 
        "CME_ERROR": "+CME ERROR" as AtMessageId, 
        "CMS_ERROR": "+CMS ERROR" as AtMessageId,

        "CNUM": "+CNUM" as AtMessageId,
        "CMGR": "+CMGR" as AtMessageId, 
        "CMTI": "+CMTI" as AtMessageId, 
        "CPIN": "+CPIN" as AtMessageId,
        "CMEE": "+CMEE" as AtMessageId, 
        "CMGL": "+CMGL" as AtMessageId, 
        "CDSI": "+CDSI" as AtMessageId,
        "CDS": "CDS" as AtMessageId, 
        "CMT": "+CMT" as AtMessageId, 
        "CMGS": "+CMGS" as AtMessageId,
        "CPBS": "+CPBS" as AtMessageId,
        "CPBR": "+CPBR" as AtMessageId,
        "CPBR_TEST": "+CPBR TEST" as AtMessageId,

        "HUAWEI_BOOT": "^BOOT" as AtMessageId, 
        "HUAWEI_RSSI": "^RSSI" as AtMessageId, 
        "HUAWEI_SIMST": "^SIMST" as AtMessageId, 
        "HUAWEI_SRVST": "^SRVST" as AtMessageId, 
        "HUAWEI_CPIN": "^CPIN" as AtMessageId, 
        "HUAWEI_SYSINFO": "^SYSINFO" as AtMessageId,
        "HUAWEI_MODE": "^MODE" as AtMessageId
};

export let atIdsUnso: AtMessageId[] = [
        atIds.CMTI,
        atIds.CMT,
        atIds.CDSI,
        atIds.CDS,
        atIds.HUAWEI_BOOT,
        atIds.HUAWEI_RSSI,
        atIds.HUAWEI_SIMST,
        atIds.HUAWEI_SRVST,
        atIds.HUAWEI_MODE
];


export let atIdsFinal: AtMessageId[] = [
        atIds.OK,
        atIds.CONNECT,
        atIds.RING,
        atIds.NO_CARRIER,
        atIds.NO_DIALTONE,
        atIds.BUSY,
        atIds.NO_ANSWER,
        atIds.COMMAND_NOT_SUPPORT,
        atIds.TOO_MANY_PARAMETERS,
        atIds.ERROR,
        atIds.CME_ERROR,
        atIds.CMS_ERROR,
        atIds.INVITE
];

export let atIdsError: AtMessageId[] = [
        atIds.NO_CARRIER,
        atIds.NO_DIALTONE,
        atIds.BUSY,
        atIds.NO_ANSWER,
        atIds.COMMAND_NOT_SUPPORT,
        atIds.TOO_MANY_PARAMETERS,
        atIds.ERROR,
        atIds.CME_ERROR,
        atIds.CMS_ERROR
];

export let atIdsPdu: AtMessageId[] = [
        atIds.CMGR,
        atIds.CMT,
        atIds.CDS,
        atIds.CMGL
];


export class AtMessage {

        public isUnsolicited?: boolean;
        public isFinal?: boolean;
        public error?: AtMessage;
        public isError?: boolean;


        constructor(public readonly id: AtMessageId,
                public readonly raw: string
        ) {

                if (atIdsUnso.indexOf(this.id) > -1)
                        this.isUnsolicited = true;

                if (atIdsFinal.indexOf(this.id) > -1)
                        this.isFinal = true;

                if (atIdsError.indexOf(this.id) > -1)
                        this.isError = true;

        }

}

export class AtMessageList extends AtMessage {

        constructor(raw: string,
                public readonly atMessages: AtMessage[]
        ) {

                super(atIds.AT_LIST, raw);


        }
}


export type MemStorage = "SM" | "ME" | "ON" | "EN" | "FD";

export type PinState = "READY" | "SIM PIN" | "SIM PUK" | "SIM PIN2" | "SIM PUK2";

export let pinStates = {
        "READY": "READY" as PinState,
        "SIM_PIN": "SIM PIN" as PinState,
        "SIM_PUK": "SIM PUK" as PinState,
        "SIM_PIN2": "SIM PIN2" as PinState,
        "SIM_PUK2": "SIM PUK2" as PinState
};

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
        GPS = 6,
        GSM_WCDMA = 7,
        CDMA_HDR_HYBRID = 8,
        TD_SCDMA = 15
}

export enum SysSubMode {
        NO_SERVICES = 0,
        GSM = 1,
        GPRS = 2,
        EDGE = 3,
        WCDMA = 4,
        HSDPA = 5,
        HSUPA = 6,
        HSUPAHSDPA = 7,
        TD_SCDMA = 8,
        HSPA_P = 9,
        EVDO_REV_0 = 10,
        EVDO_REV_A = 11,
        EVDO_REV_B = 12,
        ONE_X_RTT = 13,
        UMB = 14,
        ONE_X_EVDV = 15,
        TREE_X_RTT = 16,
        HSPA_P_64QAM = 17,
        HSPA_P_MIMO = 18
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
        RECEIVED_UNREAD = 0,
        RECEIVED_READ = 1,
        STORED_UNSENT = 2,
        STORED_SENT = 3,
        ALL = 4
}

//TS 24.008 10.5.4.7 145 === 10010001
export enum TypeOfNumber {
        UNKNOWN = 0b000,
        INTERNATIONAL_NUMBER = 0b001,
        NATIONAL_NUMBER = 0b010,
        NETWORK_SPECIFIC = 0b011,
        DEDICATED_ACCESS_AKA_SHORT_CODE = 0b100,
        RESERVED_FOR_EXTENSION = 0b111
}

export enum NumberingPlanIdentification {
        UNKNOWN = 0b0000,
        ISDN_OR_TELEPHONY = 0b0001,
        DATA = 0b0011,
        TELEX = 0b0100,
        NATIONAL = 0b1000,
        PRIVATE = 0b1001,
        RESERVED_FOR_CTS = 0b1011,
        RESERVED_FOR_EXTENSION = 0b1111
}

function getBits(bits: number, to: number, from: number): number {

        let getBit = (str: string, i: number): string => {
                let index = str.length - i;
                if (index >= 0) return str[index];
                else return "0";
        };

        let str = bits.toString(2);

        let chunk = "";

        for (let i = from; i <= to; i++) chunk = getBit(str, i) + chunk;

        return parseInt(chunk, 2);

}

export namespace AtImps {

        //+CMEE: 2
        export class CMEE extends AtMessage {
                public readonly reportModeName: string;
                constructor(raw: string,
                        public readonly reportMode: ReportMode) {
                        super(atIds.CMEE, raw);

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

                        super(atIds.HUAWEI_SIMST, raw);

                        this.simStateName = SimState[simState];

                        if (typeof (lock) === "boolean") this.lock = lock;

                }

        }

        //^SRVST: 0
        export class HUAWEI_SRVST extends AtMessage {
                public readonly serviceStatusName: string;
                constructor(raw: string,
                        public readonly serviceStatus: ServiceStatus) {
                        super(atIds.HUAWEI_SRVST, raw);
                        this.serviceStatusName = ServiceStatus[serviceStatus];
                }
        }


        //+CME ERROR: 3
        export class CME_ERROR extends AtMessage {
                public readonly verbose: string;

                constructor(raw: string,
                        public readonly code: number) {

                        super(atIds.CME_ERROR, raw);
                        this.verbose = getCmeErrorVerbose(this.code);
                }
        }

        //+CMS ERROR: 301
        export class CMS_ERROR extends AtMessage {
                public readonly verbose: string;

                constructor(raw: string,
                        public readonly code: number) {

                        super(atIds.CMS_ERROR, raw);

                        this.verbose = getCmsErrorVerbose(this.code);
                }
        }


        //+CMGR: 0,,26\r\n07913306092069F0040B913336766883F5000061216232414440084EF289EC26BBC9\r\n
        export class CMGR extends AtMessage {

                public readonly statName: string;

                constructor(raw: string,
                        public readonly stat: MessageStat,
                        public readonly length: number,
                        public readonly pdu: string, ) {

                        super(atIds.CMGR, raw);

                        this.statName = MessageStat[stat];
                }

        }

        //+CMTI: "SM",29
        export class CMTI extends AtMessage {


                constructor(raw: string,
                        public readonly mem: MemStorage,
                        public readonly index: number) {

                        super(atIds.CMTI, raw);

                }

        }


        //+CMT: ,24\r\n0891683108608805F9240D91683109731147F400003130505152430004F4F29C0E
        export class CMT extends AtMessage {
                constructor(raw: string,
                        public readonly length: number,
                        public readonly pdu: string) {
                        super(atIds.CMT, raw);
                }
        }



        //+CDSI: "SM",29
        export class CDSI extends AtMessage {
                constructor(raw: string,
                        public readonly mem: MemStorage,
                        public readonly index: number) {

                        super(atIds.CDSI, raw);
                }
        }


        //+CDS: 26\r\n0891683108608805F906750D91683109731147F4313050913492003130509134430000
        export class CDS extends AtMessage {
                constructor(raw: string,
                        public readonly length: number,
                        public readonly pdu: string) {
                        super(atIds.CDS, raw);
                }
        }

        //\r\nERROR+CNUM: "","+393701307294",145\r\n\r\n
        //\r\n+CNUM: "CC","+8613987654321",129\r\n
        export class CNUM extends AtMessage {

                public readonly typeOfNumber: TypeOfNumber;
                public readonly typeOfNumberName: string;
                public readonly numberingPlanId: NumberingPlanIdentification;
                public readonly numberingPlanIdName: string;

                constructor(raw: string,
                        public readonly alpha: string,
                        public readonly number: string,
                        type: number) {

                        super(atIds.CNUM, raw);

                        this.numberingPlanId = getBits(type, 4, 1);
                        this.typeOfNumber = getBits(type, 7, 5);

                        this.numberingPlanIdName = NumberingPlanIdentification[this.numberingPlanId] || "RESERVED";
                        this.typeOfNumberName = TypeOfNumber[this.typeOfNumber] || "RESERVED";

                }
        }

        export class CPBR extends AtMessage {
                public readonly typeOfNumber: TypeOfNumber;
                public readonly typeOfNumberName: string;
                public readonly numberingPlanId: NumberingPlanIdentification;
                public readonly numberingPlanIdName: string;

                constructor(raw: string,
                        public readonly index: number,
                        public readonly number: string,
                        type: number,
                        public readonly text: string,
                ) {
                        super(atIds.CPBR, raw);

                        this.numberingPlanId = getBits(type, 4, 1);
                        this.typeOfNumber = getBits(type, 7, 5);

                        this.numberingPlanIdName = NumberingPlanIdentification[this.numberingPlanId] || "RESERVED";
                        this.typeOfNumberName = TypeOfNumber[this.typeOfNumber] || "RESERVED";

                }
        }

        export class CPBR_TEST extends AtMessage {
                constructor(raw: string,
                        public readonly range: [number, number],
                        public readonly nLength: number,
                        public readonly tLength: number
                ) {
                        super(atIds.CPBR_TEST, raw);
                }
        }

        //\r\n+CPIN: SIM PIN\r\n
        //\r\n+CPIN: READY\r\n
        export class CPIN extends AtMessage {
                constructor(raw: string,
                        public readonly pinState: PinState) {

                        super(atIds.CPIN, raw);
                }
        }

        // \r\n^CPIN: SIM PIN,3,10,3,10,3\r\n
        // \r\n^CPIN: READY,,10,3,10,3\r\n
        export class HUAWEI_CPIN extends AtMessage {

                public readonly pinStateName: string;

                //<code>,[<times>],<puk_times>,<pin_times>,<puk2_times>,<pin2_ti mes><
                constructor(raw: string,
                        public readonly pinState: PinState,
                        public readonly times: number,
                        public readonly pukTimes: number,
                        public readonly pinTimes: number,
                        public readonly puk2Times: number,
                        public readonly pin2Times: number) {

                        super(atIds.HUAWEI_CPIN, raw);

                }

        }

        export class HUAWEI_SYSINFO extends AtMessage {
                public readonly serviceStatusName: string;
                public readonly serviceDomainName: string;
                public readonly sysModeName: string;
                public readonly simStateName: string;
                public readonly sysSubModeName: string;
                constructor(raw: string,
                        public readonly serviceStatus: ServiceStatus,
                        public readonly serviceDomain: ServiceDomain,
                        public readonly isRoaming: boolean,
                        public readonly sysMode: SysMode,
                        public readonly simState: SimState,
                        public readonly cardLock: boolean,
                        public readonly sysSubMode: SysSubMode) {
                        super(atIds.HUAWEI_SYSINFO, raw);

                        this.serviceStatusName = ServiceStatus[serviceStatus];
                        this.serviceDomainName = ServiceDomain[serviceDomain];
                        if (typeof (sysSubMode) === "number") this.sysSubModeName = SysSubMode[sysSubMode];
                        this.sysModeName = SysMode[sysMode];
                        this.simStateName = SimState[simState];

                }
        }

        export class HUAWEI_MODE extends AtMessage {
                public readonly sysModeName: string;
                public readonly sysSubModeName: string;
                constructor(raw: string,
                        public readonly sysMode: SysMode,
                        public readonly sysSubMode: SysSubMode
                ) {
                        super(atIds.HUAWEI_MODE, raw);
                        this.sysModeName = SysMode[this.sysMode];
                        this.sysSubModeName = SysSubMode[this.sysSubMode];
                }
        }

        //\r\n+CMGL: 0,1,,22\r\n07913306092049F0040B913336766883F500007110811094904003CF7A1A

        export class CMGL extends AtMessage {

                public readonly statName: string;

                constructor(raw: string,
                        public readonly index: number,
                        public readonly stat: MessageStat,
                        public readonly length: number,
                        public readonly pdu: string) {
                        super(atIds.CMGL, raw);

                        this.statName = MessageStat[stat];
                }
        }

        //\r\n+CMGS: 135\r\n

        export class CMGS extends AtMessage {
                constructor(raw: string,
                        public readonly mr: number) {
                        super(atIds.CMGS, raw);
                }
        }

        export class CPBS extends AtMessage {
                constructor(raw: string,
                        public readonly storage: MemStorage,
                        public readonly used: number,
                        public readonly total: number
                ) {
                        super(atIds.CPBS, raw);
                }
        }

}