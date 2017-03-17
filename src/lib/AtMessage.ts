import {
        AtId,
        atIdDict,
        unsoTokens,
        unsoTokensPdu,
        finalTokens,
        errorTokens
} from "./generated/AtMessageId";

import * as errors from "./errors";

export class AtMessage {

        public isUnsolicited?: boolean;
        public isFinal?: boolean;
        public isError?: boolean;
        public readonly id: AtMessage.Id | undefined;

        constructor(
                public readonly raw: string,
                id?: AtMessage.Id
        ) {
                this.id = AtMessage.idDict[this["constructor"]["name"]] || id;

                if (!this.id) return;

                if (new.target.isUnso(this.id)) this.isUnsolicited = true;
                if (new.target.isFinal(this.id)) this.isFinal = true;
                if (new.target.isError(this.id)) this.isError = true;

        }


        public static isUnso(token: string): boolean;
        public static isUnso(id: AtMessage.Id): boolean;
        public static isUnso(x): boolean {

                let token: string;

                if (AtMessage.idDict[x]) token = this.idToToken(x);
                else token = x as string;

                return unsoTokens.concat(unsoTokensPdu).indexOf(token) >= 0;

        };

        public static isFinal(token: string): boolean;
        public static isFinal(id: AtMessage.Id): boolean;
        public static isFinal(x): any {

                let token: string;

                if (AtMessage.idDict[x]) token = this.idToToken(x);
                else token = x as string;


                return finalTokens.indexOf(token) >= 0 || errorTokens.indexOf(token) >= 0;


        };


        public static hasPdu(unsoToken: string): boolean {

                return unsoTokensPdu.indexOf(unsoToken) >= 0;

        };

        public static tokenToId(
                token: string,
                type?: "READ" | "EXEC" | "SET"
        ): AtMessage.Id {

                //^SIMST => CX_SIMST_URC
                //COMMAND NOT SUPPORT => COMMAND_NOT_SUPPORT

                let id = token;

                id = id.replace(/^\^/, "CX_");
                id = id.replace(/^\+/, "P_");
                id = id.replace(/\ /g, "_");

                if (this.isUnso(token))
                        id += "_URC";
                else if (!this.isFinal(token) && type)
                        id += "_" + type;

                return AtMessage.idDict[id];

        }


        private static isError(id: AtMessage.Id): boolean {

                let token = this.idToToken(id);

                return errorTokens.indexOf(token) >= 0;

        };

        private static idToToken(id: AtMessage.Id): string {

                //CX_SIMST_URC => "^SIMST"

                let token = id as string;

                token = token.replace(/^CX_/, "^");
                token = token.replace(/^P_/, "+");

                token = token.replace(/_(URC|READ|EXEC|SET|)$/, "");

                token = token.replace(/_/g, " ");

                return token;

        };


}




export namespace AtMessage {

        export type Id = AtId;

        export let idDict = atIdDict;


        /* ENUM  */

        export type MemStorage = "SM" | "ME" | "ON" | "EN" | "FD";

        export type LockedPinState = "SIM PIN" | "SIM PUK" | "SIM PIN2" | "SIM PUK2";

        export type PinState = LockedPinState | "READY";

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
                REC_UNREAD = 0,
                REC_READ = 1,
                STO_UNSENT = 2,
                STO_SENT = 3,
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

        /* END ENUM */


        export class LIST extends AtMessage {

                constructor(raw: string,
                        public readonly atMessages: AtMessage[]
                ) {
                        super(raw, idDict.LIST);
                }
        }

        export class P_CMEE_READ extends AtMessage {
                public readonly reportModeName: string;
                constructor(raw: string,
                        public readonly reportMode: ReportMode) {
                        super(raw);

                        this.reportModeName = ReportMode[reportMode];
                }
        }

        export class CX_SIMST_URC extends AtMessage {

                public readonly simStateName: string;
                public readonly lock?: boolean;

                constructor(raw: string,
                        public readonly simState: SimState,
                        lock: boolean) {

                        super(raw);

                        this.simStateName = SimState[simState];

                        if (typeof (lock) === "boolean") this.lock = lock;

                }

        }

        export class CX_SRVST_URC extends AtMessage {
                public readonly serviceStatusName: string;
                constructor(raw: string,
                        public readonly serviceStatus: ServiceStatus) {
                        super(raw);
                        this.serviceStatusName = ServiceStatus[serviceStatus];
                }
        }

        export class P_CME_ERROR extends AtMessage {

                public readonly verbose: string;
                public readonly code: number;

                constructor(raw: string,
                        info: number | string) {

                        super(raw);

                        switch (typeof (info)) {
                                case "number":
                                        this.code = info as number;
                                        this.verbose = errors.getCmeErrorVerbose(this.code);
                                        break;
                                case "string":
                                        this.verbose = info as string;
                                        let code = errors.getCmeErrorCode(this.verbose);
                                        if (code) this.code = code;
                                        break;
                        }

                }
        }

        export class P_CMS_ERROR extends AtMessage {
                public readonly verbose: string;
                public readonly code: number;

                constructor(raw: string,
                        info: number | string) {

                        super(raw);

                        switch (typeof (info)) {
                                case "number":
                                        this.code = info as number;
                                        this.verbose = errors.getCmsErrorVerbose(this.code);
                                        break;
                                case "string":
                                        this.verbose = info as string;
                                        let code = errors.getCmsErrorCode(this.verbose);
                                        if (code) this.code = code;
                                        break;
                        }

                }
        }

        export class P_CMGR_SET extends AtMessage {
                public readonly statName: string;

                constructor(raw: string,
                        public readonly stat: MessageStat,
                        public readonly length: number,
                        public readonly pdu: string, ) {

                        super(raw);

                        this.statName = MessageStat[stat];
                }

        }

        export class P_CMTI_URC extends AtMessage {
                constructor(raw: string,
                        public readonly mem: MemStorage,
                        public readonly index: number) {

                        super(raw);

                }

        }

        export class P_CMT_URC extends AtMessage {
                constructor(raw: string,
                        public readonly length: number,
                        public readonly pdu: string) {
                        super(raw);
                }
        }

        export class P_CDSI_URC extends AtMessage {
                constructor(raw: string,
                        public readonly mem: MemStorage,
                        public readonly index: number) {

                        super(raw);
                }
        }

        export class P_CDS_URC extends AtMessage {
                constructor(raw: string,
                        public readonly length: number,
                        public readonly pdu: string) {
                        super(raw);
                }
        }

        export class P_CNUM_EXEC extends AtMessage {

                public readonly typeOfNumber: TypeOfNumber;
                public readonly typeOfNumberName: string;
                public readonly numberingPlanId: NumberingPlanIdentification;
                public readonly numberingPlanIdName: string;
                public error: ERROR | P_CME_ERROR;

                constructor(raw: string,
                        public readonly alpha: string,
                        public readonly number: string,
                        type: number) {

                        super(raw);

                        this.numberingPlanId = getBits(type, 4, 1);
                        this.typeOfNumber = getBits(type, 7, 5);

                        this.numberingPlanIdName = NumberingPlanIdentification[this.numberingPlanId] || "RESERVED";
                        this.typeOfNumberName = TypeOfNumber[this.typeOfNumber] || "RESERVED";

                }
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

        export class P_CPBR_EXEC extends AtMessage {
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
                        super(raw);

                        this.numberingPlanId = getBits(type, 4, 1);
                        this.typeOfNumber = getBits(type, 7, 5);

                        this.numberingPlanIdName = NumberingPlanIdentification[this.numberingPlanId] || "RESERVED";
                        this.typeOfNumberName = TypeOfNumber[this.typeOfNumber] || "RESERVED";

                }
        }

        export class P_CPBR_TEST extends AtMessage {
                constructor(raw: string,
                        public readonly range: [number, number],
                        public readonly nLength: number,
                        public readonly tLength: number
                ) {
                        super(raw);
                }
        }

        export class P_CPIN_READ extends AtMessage {
                constructor(raw: string,
                        public readonly pinState: PinState) {

                        super(raw);
                }
        }

        export class CX_CPIN_READ extends AtMessage {

                public readonly pinStateName: string;

                constructor(raw: string,
                        public readonly pinState: PinState,
                        public readonly times: number,
                        public readonly pukTimes: number,
                        public readonly pinTimes: number,
                        public readonly puk2Times: number,
                        public readonly pin2Times: number) {

                        super(raw);

                }

        }

        export class CX_SYSINFO_EXEC extends AtMessage {
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
                        super(raw);

                        this.serviceStatusName = ServiceStatus[serviceStatus];
                        this.serviceDomainName = ServiceDomain[serviceDomain];
                        if (typeof (sysSubMode) === "number")
                                this.sysSubModeName = SysSubMode[sysSubMode];
                        this.sysModeName = SysMode[sysMode];
                        this.simStateName = SimState[simState];

                }
        }

        export class CX_MODE_URC extends AtMessage {
                public readonly sysModeName: string;
                public readonly sysSubModeName: string;
                constructor(raw: string,
                        public readonly sysMode: SysMode,
                        public readonly sysSubMode: SysSubMode
                ) {
                        super(raw);
                        this.sysModeName = SysMode[this.sysMode];
                        this.sysSubModeName = SysSubMode[this.sysSubMode];
                }
        }

        export class P_CMGL_SET extends AtMessage {

                public readonly statName: string;

                constructor(raw: string,
                        public readonly index: number,
                        public readonly stat: MessageStat,
                        public readonly length: number,
                        public readonly pdu: string) {
                        super(raw);

                        this.statName = MessageStat[stat];
                }
        }

        export class P_CMGL_TEST extends AtMessage {
                constructor(raw: string,
                        public readonly range: [MessageStat, MessageStat]
                ) {
                        super(raw);
                }
        }

        export class P_CMGS_SET extends AtMessage {
                constructor(raw: string,
                        public readonly mr: number) {
                        super(raw);
                }
        }

        export class P_CPBS_READ extends AtMessage {
                constructor(raw: string,
                        public readonly storage: MemStorage,
                        public readonly used: number,
                        public readonly total: number
                ) {
                        super(raw);
                }
        }

        export class CX_ICCID_SET extends AtMessage {
                constructor(raw: string,
                        public readonly iccid: string
                ) {
                        super(raw);
                }
        }

        export class P_CLAC_EXEC extends AtMessage {
                constructor(raw: string,
                        public readonly supportedCommands: string[]
                ){
                        super(raw);
                }
        }

        export class CONNECT extends AtMessage {
                constructor(raw: string,
                        public readonly baudRate: number) {
                        super(raw);
                }
        }

        export class ERROR extends AtMessage {
                constructor(raw: string) {
                        super(raw);
                }
        }


}