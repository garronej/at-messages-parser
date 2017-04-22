import { AtId } from "./generated/AtMessageId";
export declare class AtMessage {
    readonly raw: string;
    isUnsolicited?: boolean;
    isFinal?: boolean;
    isError?: boolean;
    readonly id: AtMessage.Id | undefined;
    constructor(raw: string, id?: AtMessage.Id);
    static isUnso(token: string): boolean;
    static isUnso(id: AtMessage.Id): boolean;
    static isFinal(token: string): boolean;
    static isFinal(id: AtMessage.Id): boolean;
    static hasPdu(unsoToken: string): boolean;
    static tokenToId(token: string, type?: "READ" | "EXEC" | "SET"): AtMessage.Id;
    private static isError(id);
    private static idToToken(id);
}
export declare namespace AtMessage {
    type Id = AtId;
    let idDict: {
        "ECHO": AtId;
        "P_CMTI_URC": AtId;
        "P_CDSI_URC": AtId;
        "CX_SIMST_URC": AtId;
        "CX_SRVST_URC": AtId;
        "CX_MODE_URC": AtId;
        "CX_RSSI_URC": AtId;
        "CX_CSNR_URC": AtId;
        "CX_DSFLOWRPT_URC": AtId;
        "CX_EARST_URC": AtId;
        "CX_ACTIVEBAND_URC": AtId;
        "CX_RSSILVL_URC": AtId;
        "CX_HRSSILVL_URC": AtId;
        "CX_HDRRSSI_URC": AtId;
        "CX_CRSSI_URC": AtId;
        "CX_ANLEVEL_URC": AtId;
        "CX_BOOT_URC": AtId;
        "P_CLIP_URC": AtId;
        "P_CCWA_URC": AtId;
        "P_CRING_URC": AtId;
        "P_CUSD_URC": AtId;
        "P_CUSATP_URC": AtId;
        "P_CUSATEND_URC": AtId;
        "P_PACSP_URC": AtId;
        "CX_NWTIME_URC": AtId;
        "CX_SYSSTART_URC": AtId;
        "CX_ORIG_URC": AtId;
        "CX_THERM_URC": AtId;
        "CX_CONF_URC": AtId;
        "CX_CONN_URC": AtId;
        "CX_CEND_URC": AtId;
        "CX_SMMEMFULL_URC": AtId;
        "CX_IPDATA_URC": AtId;
        "CX_IPSTATE_URC": AtId;
        "CX_TIMESETRULT_URC": AtId;
        "CX_DATASETRULT_URC": AtId;
        "CX_XDSTATUS_URC": AtId;
        "CX_POSITION_URC": AtId;
        "CX_POSEND_URC": AtId;
        "CX_WNINV_URC": AtId;
        "CX_FOTASTATE_URC": AtId;
        "CX_FWLSTATE_URC": AtId;
        "CX_NDISEND_URC": AtId;
        "CX_NDISSTAT_URC": AtId;
        "P_CREG_URC": AtId;
        "RING_URC": AtId;
        "P_CMT_URC": AtId;
        "P_CDS_URC": AtId;
        "INVITE": AtId;
        "OK": AtId;
        "CONNECT": AtId;
        "NO_CARRIER": AtId;
        "NO_DIALTONE": AtId;
        "BUSY": AtId;
        "NO_ANSWER": AtId;
        "COMMAND_NOT_SUPPORT": AtId;
        "TOO_MANY_PARAMETERS": AtId;
        "ERROR": AtId;
        "P_CME_ERROR": AtId;
        "P_CMS_ERROR": AtId;
        "LIST": AtId;
        "P_CMEE_READ": AtId;
        "P_CMGR_SET": AtId;
        "P_CNUM_EXEC": AtId;
        "P_CPBR_EXEC": AtId;
        "P_CPBR_TEST": AtId;
        "P_CPIN_READ": AtId;
        "CX_CPIN_READ": AtId;
        "CX_SYSINFO_EXEC": AtId;
        "P_CMGL_SET": AtId;
        "P_CMGL_TEST": AtId;
        "P_CMGS_SET": AtId;
        "P_CPBS_READ": AtId;
        "CX_ICCID_SET": AtId;
        "CX_SPN_SET": AtId;
        "P_CLAC_EXEC": AtId;
        "P_CRSM_SET": AtId;
        "P_CPMS_SET": AtId;
        "P_CPMS_READ": AtId;
        "P_CMGW_EXEC": AtId;
    };
    type MemStorage = "SM" | "ME" | "ON" | "EN" | "FD";
    type LockedPinState = "SIM PIN" | "SIM PUK" | "SIM PIN2" | "SIM PUK2";
    type PinState = LockedPinState | "READY";
    enum ServiceStatus {
        NO_SERVICES = 0,
        RESTRICTED_SERVICES = 1,
        VALID_SERVICES = 2,
        RESTRICTED_REGIONAL_SERVICES = 3,
        POWER_SAVING_OR_HIBERNATE_STATE = 4,
    }
    enum ServiceDomain {
        NO_SERVICES = 0,
        ONLY_CS_SERVICES = 1,
        ONLY_PS_SERVICES = 2,
        PS_AND_CS_SERVICES = 3,
        CS_AND_PS_NOT_REGISTERED_SEARCHING = 4,
    }
    enum SysMode {
        NO_SERVICES = 0,
        AMPS = 1,
        CDMA = 2,
        GSM_GPRS = 3,
        HDR = 4,
        WCDMA = 5,
        GPS = 6,
        GSM_WCDMA = 7,
        CDMA_HDR_HYBRID = 8,
        TD_SCDMA = 15,
    }
    enum SysSubMode {
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
        HSPA_P_MIMO = 18,
    }
    enum SimState {
        INVALID_SIM = 0,
        VALID_SIM = 1,
        INVALID_SIM_CS = 2,
        INVALID_SIM_PS = 3,
        INVALID_SIM_PS_CS = 4,
        ROM_SIM = 240,
        NO_SIM = 255,
    }
    enum ReportMode {
        NO_DEBUG_INFO = 0,
        DEBUG_INFO_CODE = 1,
        DEBUG_INFO_VERBOSE = 2,
    }
    enum MessageStat {
        REC_UNREAD = 0,
        REC_READ = 1,
        STO_UNSENT = 2,
        STO_SENT = 3,
        ALL = 4,
    }
    enum TypeOfNumber {
        UNKNOWN = 0,
        INTERNATIONAL_NUMBER = 1,
        NATIONAL_NUMBER = 2,
        NETWORK_SPECIFIC = 3,
        DEDICATED_ACCESS_AKA_SHORT_CODE = 4,
        RESERVED_FOR_EXTENSION = 7,
    }
    enum NumberingPlanIdentification {
        UNKNOWN = 0,
        ISDN_OR_TELEPHONY = 1,
        DATA = 3,
        TELEX = 4,
        NATIONAL = 8,
        PRIVATE = 9,
        RESERVED_FOR_CTS = 11,
        RESERVED_FOR_EXTENSION = 15,
    }
    class LIST extends AtMessage {
        readonly atMessages: AtMessage[];
        constructor(raw: string, atMessages: AtMessage[]);
    }
    class P_CMEE_READ extends AtMessage {
        readonly reportMode: ReportMode;
        readonly reportModeName: string;
        constructor(raw: string, reportMode: ReportMode);
    }
    class CX_SIMST_URC extends AtMessage {
        readonly simState: SimState;
        readonly simStateName: string;
        readonly lock?: boolean;
        constructor(raw: string, simState: SimState, lock: boolean);
    }
    class CX_SRVST_URC extends AtMessage {
        readonly serviceStatus: ServiceStatus;
        readonly serviceStatusName: string;
        constructor(raw: string, serviceStatus: ServiceStatus);
    }
    class P_CME_ERROR extends AtMessage {
        readonly verbose: string;
        readonly code: number;
        constructor(raw: string, info: number | string);
    }
    class P_CMS_ERROR extends AtMessage {
        readonly verbose: string;
        readonly code: number;
        constructor(raw: string, info: number | string);
    }
    class P_CMGR_SET extends AtMessage {
        readonly stat: MessageStat;
        readonly length: number;
        readonly pdu: string;
        readonly statName: string;
        constructor(raw: string, stat: MessageStat, length: number, pdu: string);
    }
    class P_CMTI_URC extends AtMessage {
        readonly mem: MemStorage;
        readonly index: number;
        constructor(raw: string, mem: MemStorage, index: number);
    }
    class P_CMT_URC extends AtMessage {
        readonly length: number;
        readonly pdu: string;
        constructor(raw: string, length: number, pdu: string);
    }
    class P_CDSI_URC extends AtMessage {
        readonly mem: MemStorage;
        readonly index: number;
        constructor(raw: string, mem: MemStorage, index: number);
    }
    class P_CDS_URC extends AtMessage {
        readonly length: number;
        readonly pdu: string;
        constructor(raw: string, length: number, pdu: string);
    }
    class P_CNUM_EXEC extends AtMessage {
        readonly alpha: string;
        readonly number: string;
        readonly typeOfNumber: TypeOfNumber;
        readonly typeOfNumberName: string;
        readonly numberingPlanId: NumberingPlanIdentification;
        readonly numberingPlanIdName: string;
        error: ERROR | P_CME_ERROR;
        constructor(raw: string, alpha: string, number: string, type: number);
    }
    class P_CPBR_EXEC extends AtMessage {
        readonly index: number;
        readonly number: string;
        readonly text: string;
        readonly typeOfNumber: TypeOfNumber;
        readonly typeOfNumberName: string;
        readonly numberingPlanId: NumberingPlanIdentification;
        readonly numberingPlanIdName: string;
        constructor(raw: string, index: number, number: string, type: number, text: string);
    }
    class P_CPBR_TEST extends AtMessage {
        readonly range: [number, number];
        readonly nLength: number;
        readonly tLength: number;
        constructor(raw: string, range: [number, number], nLength: number, tLength: number);
    }
    class P_CPIN_READ extends AtMessage {
        readonly pinState: PinState;
        constructor(raw: string, pinState: PinState);
    }
    class CX_CPIN_READ extends AtMessage {
        readonly pinState: PinState;
        readonly times: number;
        readonly pukTimes: number;
        readonly pinTimes: number;
        readonly puk2Times: number;
        readonly pin2Times: number;
        readonly pinStateName: string;
        constructor(raw: string, pinState: PinState, times: number, pukTimes: number, pinTimes: number, puk2Times: number, pin2Times: number);
    }
    class CX_SYSINFO_EXEC extends AtMessage {
        readonly serviceStatus: ServiceStatus;
        readonly serviceDomain: ServiceDomain;
        readonly isRoaming: boolean;
        readonly sysMode: SysMode;
        readonly simState: SimState;
        readonly cardLock: boolean;
        readonly sysSubMode: SysSubMode;
        readonly serviceStatusName: string;
        readonly serviceDomainName: string;
        readonly sysModeName: string;
        readonly simStateName: string;
        readonly sysSubModeName: string;
        constructor(raw: string, serviceStatus: ServiceStatus, serviceDomain: ServiceDomain, isRoaming: boolean, sysMode: SysMode, simState: SimState, cardLock: boolean, sysSubMode: SysSubMode);
    }
    class CX_MODE_URC extends AtMessage {
        readonly sysMode: SysMode;
        readonly sysSubMode: SysSubMode;
        readonly sysModeName: string;
        readonly sysSubModeName: string;
        constructor(raw: string, sysMode: SysMode, sysSubMode: SysSubMode);
    }
    class P_CMGL_SET extends AtMessage {
        readonly index: number;
        readonly stat: MessageStat;
        readonly length: number;
        readonly pdu: string;
        readonly statName: string;
        constructor(raw: string, index: number, stat: MessageStat, length: number, pdu: string);
    }
    class P_CMGL_TEST extends AtMessage {
        readonly range: [MessageStat, MessageStat];
        constructor(raw: string, range: [MessageStat, MessageStat]);
    }
    class P_CMGS_SET extends AtMessage {
        readonly mr: number;
        constructor(raw: string, mr: number);
    }
    class P_CPBS_READ extends AtMessage {
        readonly storage: MemStorage;
        readonly used: number;
        readonly total: number;
        constructor(raw: string, storage: MemStorage, used: number, total: number);
    }
    class CX_ICCID_SET extends AtMessage {
        readonly iccid: string;
        constructor(raw: string, iccid: string);
    }
    class CX_SPN_SET extends AtMessage {
        readonly p1: number;
        readonly p2: number;
        readonly serviceProviderName: string;
        constructor(raw: string, p1: number, p2: number, serviceProviderName: string);
    }
    class P_CLAC_EXEC extends AtMessage {
        readonly supportedCommands: string[];
        constructor(raw: string, supportedCommands: string[]);
    }
    class P_CRSM_SET extends AtMessage {
        readonly sw1: number;
        readonly sw2: number;
        readonly response: string | undefined;
        constructor(raw: string, sw1: number, sw2: number, response: string | undefined);
    }
    type MemStorageInfo = {
        used: number;
        capacity: number;
    };
    class P_CPMS_SET extends AtMessage {
        readonly readingAndDeleting: MemStorageInfo;
        readonly writingAndSending: MemStorageInfo;
        readonly receiving: MemStorageInfo;
        constructor(raw: string, used1: number, total1: number, used2: number, total2: number, used3: number, total3: number);
    }
    class P_CPMS_READ extends AtMessage {
        readonly readingAndDeleting: {
            mem: MemStorage;
        } & MemStorageInfo;
        readonly writingAndSending: {
            mem: MemStorage;
        } & MemStorageInfo;
        readonly receiving: {
            mem: MemStorage;
        } & MemStorageInfo;
        constructor(raw: string, mem1: MemStorage, used1: number, total1: number, mem2: MemStorage, used2: number, total2: number, mem3: MemStorage, used3: number, total3: number);
    }
    class P_CMGW_EXEC extends AtMessage {
        readonly index: number;
        constructor(raw: string, index: number);
    }
    class CONNECT extends AtMessage {
        readonly baudRate: number;
        constructor(raw: string, baudRate: number);
    }
    class ERROR extends AtMessage {
        constructor(raw: string);
    }
}
