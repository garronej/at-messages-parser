import { 
        AtMessageId, 
        atIds, 
        AtMessage, 
        AtMessageList,
        AtMessageImplementations,
        MemStorage,
        PinState,
        ServiceStatus,
        ServiceDomain,
        SysMode,
        SysSubMode,
        SimState,
        ReportMode,
        MessageStat
} from "./AtMessage";


export interface AtMessageDescriptor {
        id?: AtMessageId;
        raw: string;
        [prop: string]: any;
}

export function descriptorToInstance(atMessageDescriptor: AtMessageDescriptor): AtMessage {

        let id = atMessageDescriptor.id;
        let raw = atMessageDescriptor.raw;
        let atMessage: AtMessage;

        switch (id) {
                case atIds.AT_LIST:
                        atMessage = new AtMessageList(raw,
                                (atMessageDescriptors => {

                                        let atMessages: AtMessage[] = [];

                                        for (let atMessageDescriptor of atMessageDescriptors)
                                                atMessages.push(descriptorToInstance(atMessageDescriptor));

                                        return atMessages;

                                })(atMessageDescriptor["atMessageDescriptors"] as AtMessageDescriptor[])
                        );
                        break;
                case atIds.ERROR:
                        atMessage = new AtMessageImplementations.ERROR(raw);
                        break;
                case atIds.CME_ERROR:
                        atMessage = new AtMessageImplementations.CME_ERROR(raw,
                                atMessageDescriptor["code"] as number
                        );
                        break;
                case atIds.CMS_ERROR:
                        atMessage = new AtMessageImplementations.CMS_ERROR(raw,
                                atMessageDescriptor["code"] as number
                        );
                        break;
                case atIds.CMGR:
                        atMessage = new AtMessageImplementations.CMGR(raw,
                                atMessageDescriptor["stat"] as MessageStat,
                                atMessageDescriptor["length"] as number,
                                atMessageDescriptor["pdu"] as string
                        );
                        break;
                case atIds.CMT:
                        atMessage = new AtMessageImplementations.CMT(raw,
                                atMessageDescriptor["length"] as number,
                                atMessageDescriptor["pdu"] as string
                        );
                        break;
                case atIds.CDS:
                        atMessage = new AtMessageImplementations.CDS(raw,
                                atMessageDescriptor["length"] as number,
                                atMessageDescriptor["pdu"] as string
                        );
                        break;
                case atIds.CMTI:
                        atMessage = new AtMessageImplementations.CMTI(raw,
                                atMessageDescriptor["mem"] as MemStorage,
                                atMessageDescriptor["index"] as number
                        );
                        break;
                case atIds.CDSI:
                        atMessage = new AtMessageImplementations.CDSI(raw,
                                atMessageDescriptor["mem"] as MemStorage,
                                atMessageDescriptor["index"] as number
                        );
                        break;
                case atIds.CNUM:
                        atMessage = new AtMessageImplementations.CNUM(raw,
                                atMessageDescriptor["alpha"] as string,
                                atMessageDescriptor["number"] as string,
                                atMessageDescriptor["isNational"] as boolean
                        );
                        break;
                case atIds.CPIN:
                        atMessage = new AtMessageImplementations.CPIN(raw,
                                atMessageDescriptor["pinState"] as PinState
                        );
                        break;
                case atIds.HUAWEI_SIMST:
                        atMessage = new AtMessageImplementations.HUAWEI_SIMST(raw,
                                atMessageDescriptor["simState"] as SimState,
                                atMessageDescriptor["lock"] as boolean
                        );
                        break;
                case atIds.HUAWEI_SRVST:
                        atMessage = new AtMessageImplementations.HUAWEI_SRVST(raw,
                                atMessageDescriptor["serviceStatus"] as ServiceStatus
                        );
                        break;
                case atIds.CMEE:
                        atMessage = new AtMessageImplementations.CMEE(raw,
                                atMessageDescriptor["reportMode"] as ReportMode
                        );
                        break;
                case atIds.HUAWEI_CPIN:
                        atMessage = new AtMessageImplementations.HUAWEI_CPIN(raw,
                                atMessageDescriptor["pinState"] as PinState,
                                atMessageDescriptor["times"] as number,
                                atMessageDescriptor["pukTimes"] as number,
                                atMessageDescriptor["pinTimes"] as number,
                                atMessageDescriptor["puk2Times"] as number,
                                atMessageDescriptor["pin2Times"] as number
                        );
                        break;
                case atIds.HUAWEI_SYSINFO:
                        atMessage = new AtMessageImplementations.HUAWEI_SYSINFO(raw,
                                atMessageDescriptor["serviceStatus"] as ServiceStatus,
                                atMessageDescriptor["serviceDomain"] as ServiceDomain,
                                atMessageDescriptor["isRoaming"] as boolean,
                                atMessageDescriptor["sysMode"] as SysMode,
                                atMessageDescriptor["simState"] as SimState,
                                atMessageDescriptor["cardLock"] as boolean,
                                atMessageDescriptor["sysSubMode"] as SysSubMode
                        );
                        break;
                case atIds.HUAWEI_MODE:
                        atMessage= new AtMessageImplementations.HUAWEI_MODE(raw,
                                atMessageDescriptor["sysMode"] as SysMode,
                                atMessageDescriptor["sysSubMode"] as SysSubMode
                        );
                        break;
                case atIds.CMGL:
                        atMessage = new AtMessageImplementations.CMGL(raw,
                                atMessageDescriptor["index"] as number,
                                atMessageDescriptor["stat"] as MessageStat,
                                atMessageDescriptor["length"] as number,
                                atMessageDescriptor["pdu"] as string
                        );
                        break;
                case atIds.CMGS:
                        atMessage = new AtMessageImplementations.CMGS(raw,
                                atMessageDescriptor["mr"] as number
                        );
                        break;
                case atIds.CPBS:
                        atMessage= new AtMessageImplementations.CPBS(raw,
                                atMessageDescriptor["storage"] as MemStorage,
                                atMessageDescriptor["used"] as number,
                                atMessageDescriptor["total"] as number
                        );
                        break;
                default: atMessage = new AtMessage(id, raw);
        }


        if (atMessageDescriptor["error"]) {

                atMessage.error = descriptorToInstance(atMessageDescriptor["error"]);

                delete atMessage.error.isFinal;

        }

        return atMessage;

}