import { 
        AtMessageId, 
        atIds, 
        AtMessageDescriptor, 
        AtMessage, 
        AtMessageList,
        AtMessageImplementations,
        MemStorage,
        PinState,
        ServiceStatus,
        ServiceDomain,
        SysMode,
        SimState,
        ReportMode,
        MessageStat
} from "./AtMessage";

export function descriptorToInstance(atMessageDescriptor: AtMessageDescriptor): AtMessage {

        let id = atMessageDescriptor.id as AtMessageId;
        let raw = atMessageDescriptor.raw;
        let atMessage: AtMessage;

        switch (id) {
                case atIds.AT_LIST:
                        let atMessageDescriptors = atMessageDescriptor["atMessageDescriptors"] as AtMessageDescriptor[];
                        atMessage = new AtMessageList(raw, atMessageDescriptors);
                        break;
                case atIds.ERROR:
                        atMessage = new AtMessageImplementations.ERROR(raw);
                        break;
                case atIds.CME_ERROR:
                        let cmeErrorCode = atMessageDescriptor["code"] as number;
                        atMessage = new AtMessageImplementations.CME_ERROR(raw, cmeErrorCode);
                        break;
                case atIds.CMS_ERROR:
                        let cmsErrorCode = atMessageDescriptor["code"] as number;
                        atMessage = new AtMessageImplementations.CMS_ERROR(raw, cmsErrorCode);
                        break;
                case atIds.CMGR:
                        let stat = atMessageDescriptor["stat"] as MessageStat;
                        let length = atMessageDescriptor["length"] as number;
                        let pdu = atMessageDescriptor["pdu"] as string;
                        atMessage = new AtMessageImplementations.CMGR(raw, stat, length, pdu);
                        break;
                case atIds.CMT:
                        length = atMessageDescriptor["length"] as number;
                        pdu = atMessageDescriptor["pdu"] as string;
                        atMessage = new AtMessageImplementations.CMT(raw, length, pdu);
                        break;
                case atIds.CDS:
                        length = atMessageDescriptor["length"] as number;
                        pdu = atMessageDescriptor["pdu"] as string;
                        atMessage = new AtMessageImplementations.CDS(raw, length, pdu);
                        break;
                case atIds.CMTI:
                        let mem = atMessageDescriptor["mem"] as MemStorage;
                        let index = <number>atMessageDescriptor["index"];
                        atMessage = new AtMessageImplementations.CMTI(raw, mem, index);
                        break;
                case atIds.CDSI:
                        mem = atMessageDescriptor["mem"] as MemStorage;
                        index = atMessageDescriptor["index"] as number;
                        atMessage = new AtMessageImplementations.CDSI(raw, mem, index);
                        break;
                case atIds.CNUM:
                        let alpha = atMessageDescriptor["alpha"] as string;
                        let number = atMessageDescriptor["number"] as string;
                        let isNational = atMessageDescriptor["isNational"] as boolean;
                        let hasError = atMessageDescriptor["hasError"] as boolean;
                        atMessage = new AtMessageImplementations.CNUM(raw, alpha, number, isNational);
                        break;
                case atIds.CPIN:
                        let pinState = atMessageDescriptor["pinState"] as PinState;
                        atMessage = new AtMessageImplementations.CPIN(raw, pinState);
                        break;
                case atIds.HUAWEI_SIMST:
                        let simState = atMessageDescriptor["simState"] as SimState;
                        let lock = atMessageDescriptor["lock"] as boolean;
                        atMessage = new AtMessageImplementations.HUAWEI_SIMST(raw, simState, lock);
                        break;
                case atIds.HUAWEI_SRVST:
                        let serviceStatus = atMessageDescriptor["serviceStatus"] as ServiceStatus;
                        atMessage = new AtMessageImplementations.HUAWEI_SRVST(raw, serviceStatus);
                        break;
                case atIds.CMEE:
                        let reportMode = atMessageDescriptor["reportMode"] as ReportMode;
                        atMessage = new AtMessageImplementations.CMEE(raw, reportMode);
                        break;
                case atIds.HUAWEI_CPIN:
                        pinState = atMessageDescriptor["pinState"] as PinState;
                        let times = atMessageDescriptor["times"] as number;
                        let pukTimes = atMessageDescriptor["pukTimes"] as number;
                        let pinTimes = atMessageDescriptor["pinTimes"] as number;
                        let puk2Times = atMessageDescriptor["puk2Times"] as number;
                        let pin2Times = atMessageDescriptor["pin2Times"] as number;
                        atMessage = new AtMessageImplementations.HUAWEI_CPIN(raw, pinState, times, pukTimes, pinTimes, puk2Times, pin2Times);
                        break;
                case atIds.HUAWEI_SYSINFO:
                        serviceStatus = atMessageDescriptor["serviceStatus"] as ServiceStatus;
                        let serviceDomain = atMessageDescriptor["serviceDomain"] as ServiceDomain;
                        let isRoaming = atMessageDescriptor["isRoaming"] as boolean;
                        let sysMode = atMessageDescriptor["sysMode"] as SysMode;
                        simState = atMessageDescriptor["simState"] as SimState;
                        atMessage = new AtMessageImplementations.HUAWEI_SYSINFO(raw, serviceStatus, serviceDomain, isRoaming, sysMode, simState);
                        break;
                case atIds.CMGL:
                        index = atMessageDescriptor["index"] as number;
                        stat = atMessageDescriptor["stat"] as MessageStat;
                        length = atMessageDescriptor["length"] as number;
                        pdu = atMessageDescriptor["pdu"] as string;
                        atMessage = new AtMessageImplementations.CMGL(raw, index, stat, length, pdu);
                        break;
                case atIds.CMGS:
                        let mr = atMessageDescriptor["mr"] as number;
                        atMessage = new AtMessageImplementations.CMGS(raw, mr);
                        break;
                default: atMessage = new AtMessage(id, raw);
        }


        if (atMessageDescriptor["error"]) {

                let raw = atMessageDescriptor["error"].raw;

                switch (atMessageDescriptor["error"].id as AtMessageId) {
                        case atIds.ERROR:
                                atMessage.error = new AtMessageImplementations.ERROR(raw);
                                break;
                        case atIds.CME_ERROR:
                                let cmeErrorCode = atMessageDescriptor["error"].code as number;
                                atMessage.error = new AtMessageImplementations.CME_ERROR(raw, cmeErrorCode);
                                break;
                        case atIds.CMS_ERROR:
                                let cmsErrorCode = atMessageDescriptor["error"].code as number;
                                atMessage.error = new AtMessageImplementations.CMS_ERROR(raw, cmsErrorCode);
                                break;
                        default:
                }

                delete atMessage.error.isFinal;

        }

        return atMessage;

}