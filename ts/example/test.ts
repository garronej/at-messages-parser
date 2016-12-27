
import atOutputParser from "../index";
import { AtMessageId } from "../index";
import { MemStorage } from "../index";
import { AtMessage } from "../index";
import { AtMessageCMGR } from "../index";
import { AtMessageCMTI } from "../index";
import { AtMessageCNUM } from "../index";

let input = [
        'AT\r',
        'AT+CNUM=3,"SM"\r',
        '\r\n+CMTI: "SM",26\r\n',
        '\r\n+CMGR: 0,,26\r\n07913306092011F0040B913336766883F5000061216212807140074A351A8D56AB01\r\n\r\nOK\r\n',
        '\r\n^RSSI:99\r\n',
        '\r\n^BOOT:20952548,0,0,0,72\r\n',
        '\r\n+CNUM: "CC","+8613987654321",129\r\n',
        '\r\nERROR+CNUM: "","0636786385",129\r\n\r\n',
        '\r\n+WTF:ié"réflmmfe:eza&*\r\n',
        '\r\nERROR\r\n',
        '\r\nOK\r\n'
].join("");



let atMessages: AtMessage[];

try {

        atMessages = atOutputParser(input);

} catch (error) {

        console.log(error.message);
        process.exit(1);

}

for (let atMessage of atMessages) {

        console.log(AtMessageId[atMessage.id]);

        switch (atMessage.id) {
                case AtMessageId.CMGR:
                        let atMessageCMGR = <AtMessageCMGR>atMessage;
                        console.log(atMessageCMGR);
                        break;
                case AtMessageId.CMTI:
                        let atMessageCMTI = <AtMessageCMTI>atMessage;
                        console.log(atMessageCMTI);
                        console.log("Mem: ", MemStorage[atMessageCMTI.mem]);
                        break;
                case AtMessageId.CNUM:
                        let atMessageCNUM = <AtMessageCNUM>atMessage;
                        console.log(atMessageCNUM);
                        break;
                default:
                        console.log(atMessage);
        }


}



