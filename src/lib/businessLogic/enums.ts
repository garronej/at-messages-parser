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