import { 
        AtMessageId, 
        atIds, 
        AtMessage, 
        AtMessageList,
        AtImps,
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
                case atIds.CPBR:
                        atMessage= new AtImps.CPBR(raw,
                                atMessageDescriptor["index"] as number,
                                atMessageDescriptor["number"] as string,
                                atMessageDescriptor["type"] as number,
                                atMessageDescriptor["text"] as string
                        );
                        break;
                case atIds.CMGL:
                        atMessage = new AtImps.CMGL(raw,
                                atMessageDescriptor["index"] as number,
                                atMessageDescriptor["stat"] as MessageStat,
                                atMessageDescriptor["length"] as number,
                                atMessageDescriptor["pdu"] as string
                        );
                        break;
                case atIds.CNUM:
                        atMessage = new AtImps.CNUM(raw,
                                atMessageDescriptor["alpha"] as string,
                                atMessageDescriptor["number"] as string,
                                atMessageDescriptor["type"] as number
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