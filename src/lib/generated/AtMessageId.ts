export let unsoTokens = [
    "+CMTI",
    "+CDSI",
    "^SIMST",
    "^SRVST",
    "^MODE",
    "^RSSI",
    "^CSNR",
    "^DSFLOWRPT",
    "^EARST",
    "^ACTIVEBAND",
    "^RSSILVL",
    "^HRSSILVL",
    "^HDRRSSI",
    "^CRSSI",
    "^ANLEVEL",
    "^BOOT",
    "+CLIP",
    "+CCWA",
    "+CRING",
    "+CUSD",
    "+CUSATP",
    "+CUSATEND",
    "+PACSP",
    "^NWTIME",
    "^SYSSTART",
    "^ORIG",
    "^THERM",
    "^CONF",
    "^CONN",
    "^CEND",
    "^SMMEMFULL",
    "^IPDATA",
    "^IPSTATE",
    "^TIMESETRULT",
    "^DATASETRULT",
    "^XDSTATUS",
    "^POSITION",
    "^POSEND",
    "^WNINV",
    "^FOTASTATE",
    "^FWLSTATE",
    "^NDISEND",
    "^NDISSTAT",
    "+CREG",
    "RING"
];
export let unsoTokensPdu = [
    "+CMT",
    "+CDS"
];
export let finalTokens = [
    "INVITE",
    "OK",
    "CONNECT"
];
export let errorTokens = [
    "NO CARRIER",
    "NO DIALTONE",
    "BUSY",
    "NO ANSWER",
    "COMMAND NOT SUPPORT",
    "TOO MANY PARAMETERS",
    "ERROR",
    "+CME ERROR",
    "+CMS ERROR"
];
export type AtId =
    "ECHO" |
    "P_CMTI_URC" |
    "P_CDSI_URC" |
    "CX_SIMST_URC" |
    "CX_SRVST_URC" |
    "CX_MODE_URC" |
    "CX_RSSI_URC" |
    "CX_CSNR_URC" |
    "CX_DSFLOWRPT_URC" |
    "CX_EARST_URC" |
    "CX_ACTIVEBAND_URC" |
    "CX_RSSILVL_URC" |
    "CX_HRSSILVL_URC" |
    "CX_HDRRSSI_URC" |
    "CX_CRSSI_URC" |
    "CX_ANLEVEL_URC" |
    "CX_BOOT_URC" |
    "P_CLIP_URC" |
    "P_CCWA_URC" |
    "P_CRING_URC" |
    "P_CUSD_URC" |
    "P_CUSATP_URC" |
    "P_CUSATEND_URC" |
    "P_PACSP_URC" |
    "CX_NWTIME_URC" |
    "CX_SYSSTART_URC" |
    "CX_ORIG_URC" |
    "CX_THERM_URC" |
    "CX_CONF_URC" |
    "CX_CONN_URC" |
    "CX_CEND_URC" |
    "CX_SMMEMFULL_URC" |
    "CX_IPDATA_URC" |
    "CX_IPSTATE_URC" |
    "CX_TIMESETRULT_URC" |
    "CX_DATASETRULT_URC" |
    "CX_XDSTATUS_URC" |
    "CX_POSITION_URC" |
    "CX_POSEND_URC" |
    "CX_WNINV_URC" |
    "CX_FOTASTATE_URC" |
    "CX_FWLSTATE_URC" |
    "CX_NDISEND_URC" |
    "CX_NDISSTAT_URC" |
    "P_CREG_URC" |
    "RING_URC" |
    "P_CMT_URC" |
    "P_CDS_URC" |
    "INVITE" |
    "OK" |
    "CONNECT" |
    "NO_CARRIER" |
    "NO_DIALTONE" |
    "BUSY" |
    "NO_ANSWER" |
    "COMMAND_NOT_SUPPORT" |
    "TOO_MANY_PARAMETERS" |
    "ERROR" |
    "P_CME_ERROR" |
    "P_CMS_ERROR" |
    "LIST" |
    "P_CMEE_READ" |
    "P_CMGR_SET" |
    "P_CNUM_EXEC" |
    "P_CPBR_EXEC" |
    "P_CPBR_TEST" |
    "P_CPIN_READ" |
    "CX_CPIN_READ" |
    "CX_SYSINFO_EXEC" |
    "P_CMGL_SET" |
    "P_CMGL_TEST" |
    "P_CMGS_SET" |
    "P_CPBS_READ" |
    "CX_ICCID_SET" |
    "CX_SPN_SET" |
    "P_CLAC_EXEC" |
    "P_CRSM_SET" |
    "P_CPMS_SET" |
    "P_CPMS_READ" 
;
export let atIdDict = {
    "ECHO": "ECHO" as AtId,
    "P_CMTI_URC": "P_CMTI_URC" as AtId,
    "P_CDSI_URC": "P_CDSI_URC" as AtId,
    "CX_SIMST_URC": "CX_SIMST_URC" as AtId,
    "CX_SRVST_URC": "CX_SRVST_URC" as AtId,
    "CX_MODE_URC": "CX_MODE_URC" as AtId,
    "CX_RSSI_URC": "CX_RSSI_URC" as AtId,
    "CX_CSNR_URC": "CX_CSNR_URC" as AtId,
    "CX_DSFLOWRPT_URC": "CX_DSFLOWRPT_URC" as AtId,
    "CX_EARST_URC": "CX_EARST_URC" as AtId,
    "CX_ACTIVEBAND_URC": "CX_ACTIVEBAND_URC" as AtId,
    "CX_RSSILVL_URC": "CX_RSSILVL_URC" as AtId,
    "CX_HRSSILVL_URC": "CX_HRSSILVL_URC" as AtId,
    "CX_HDRRSSI_URC": "CX_HDRRSSI_URC" as AtId,
    "CX_CRSSI_URC": "CX_CRSSI_URC" as AtId,
    "CX_ANLEVEL_URC": "CX_ANLEVEL_URC" as AtId,
    "CX_BOOT_URC": "CX_BOOT_URC" as AtId,
    "P_CLIP_URC": "P_CLIP_URC" as AtId,
    "P_CCWA_URC": "P_CCWA_URC" as AtId,
    "P_CRING_URC": "P_CRING_URC" as AtId,
    "P_CUSD_URC": "P_CUSD_URC" as AtId,
    "P_CUSATP_URC": "P_CUSATP_URC" as AtId,
    "P_CUSATEND_URC": "P_CUSATEND_URC" as AtId,
    "P_PACSP_URC": "P_PACSP_URC" as AtId,
    "CX_NWTIME_URC": "CX_NWTIME_URC" as AtId,
    "CX_SYSSTART_URC": "CX_SYSSTART_URC" as AtId,
    "CX_ORIG_URC": "CX_ORIG_URC" as AtId,
    "CX_THERM_URC": "CX_THERM_URC" as AtId,
    "CX_CONF_URC": "CX_CONF_URC" as AtId,
    "CX_CONN_URC": "CX_CONN_URC" as AtId,
    "CX_CEND_URC": "CX_CEND_URC" as AtId,
    "CX_SMMEMFULL_URC": "CX_SMMEMFULL_URC" as AtId,
    "CX_IPDATA_URC": "CX_IPDATA_URC" as AtId,
    "CX_IPSTATE_URC": "CX_IPSTATE_URC" as AtId,
    "CX_TIMESETRULT_URC": "CX_TIMESETRULT_URC" as AtId,
    "CX_DATASETRULT_URC": "CX_DATASETRULT_URC" as AtId,
    "CX_XDSTATUS_URC": "CX_XDSTATUS_URC" as AtId,
    "CX_POSITION_URC": "CX_POSITION_URC" as AtId,
    "CX_POSEND_URC": "CX_POSEND_URC" as AtId,
    "CX_WNINV_URC": "CX_WNINV_URC" as AtId,
    "CX_FOTASTATE_URC": "CX_FOTASTATE_URC" as AtId,
    "CX_FWLSTATE_URC": "CX_FWLSTATE_URC" as AtId,
    "CX_NDISEND_URC": "CX_NDISEND_URC" as AtId,
    "CX_NDISSTAT_URC": "CX_NDISSTAT_URC" as AtId,
    "P_CREG_URC": "P_CREG_URC" as AtId,
    "RING_URC": "RING_URC" as AtId,
    "P_CMT_URC": "P_CMT_URC" as AtId,
    "P_CDS_URC": "P_CDS_URC" as AtId,
    "INVITE": "INVITE" as AtId,
    "OK": "OK" as AtId,
    "CONNECT": "CONNECT" as AtId,
    "NO_CARRIER": "NO_CARRIER" as AtId,
    "NO_DIALTONE": "NO_DIALTONE" as AtId,
    "BUSY": "BUSY" as AtId,
    "NO_ANSWER": "NO_ANSWER" as AtId,
    "COMMAND_NOT_SUPPORT": "COMMAND_NOT_SUPPORT" as AtId,
    "TOO_MANY_PARAMETERS": "TOO_MANY_PARAMETERS" as AtId,
    "ERROR": "ERROR" as AtId,
    "P_CME_ERROR": "P_CME_ERROR" as AtId,
    "P_CMS_ERROR": "P_CMS_ERROR" as AtId,
    "LIST": "LIST" as AtId,
    "P_CMEE_READ": "P_CMEE_READ" as AtId,
    "P_CMGR_SET": "P_CMGR_SET" as AtId,
    "P_CNUM_EXEC": "P_CNUM_EXEC" as AtId,
    "P_CPBR_EXEC": "P_CPBR_EXEC" as AtId,
    "P_CPBR_TEST": "P_CPBR_TEST" as AtId,
    "P_CPIN_READ": "P_CPIN_READ" as AtId,
    "CX_CPIN_READ": "CX_CPIN_READ" as AtId,
    "CX_SYSINFO_EXEC": "CX_SYSINFO_EXEC" as AtId,
    "P_CMGL_SET": "P_CMGL_SET" as AtId,
    "P_CMGL_TEST": "P_CMGL_TEST" as AtId,
    "P_CMGS_SET": "P_CMGS_SET" as AtId,
    "P_CPBS_READ": "P_CPBS_READ" as AtId,
    "CX_ICCID_SET": "CX_ICCID_SET" as AtId,
    "CX_SPN_SET": "CX_SPN_SET" as AtId,
    "P_CLAC_EXEC": "P_CLAC_EXEC" as AtId,
    "P_CRSM_SET": "P_CRSM_SET" as AtId,
    "P_CPMS_SET": "P_CPMS_SET" as AtId,
    "P_CPMS_READ": "P_CPMS_READ" as AtId
};