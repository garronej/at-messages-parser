import parser from "../index";
import { AtMessageId } from "../index";
import { MemStorage } from "../index";
import { AtMessage } from "../index";
import { AtMessageImplementations } from "../index";

let input = [
        'AT+CNUM=3,"SM"\r',
        '\r\n+CMTI: "SM",26\r\n',
        '\r\n^RSSI:99\r\n',
        '\r\n^BOOT:20952548,0,0,0,72\r\n',
        '\r\n+CME ERROR: 25+CNUM: "","+33671651906",145\r\n\r\n',
        '\r\nERROR+CNUM: "","+33671651907",145\r\n\r\n',
        '\r\n+CNUM: "CC","+8613987654321",129\r\n',
        '\r\n+CMGR: 0,,26\r\n07913306092011F0040B913336766883F5000061216212807140074A351A8D56AB01\r\n',
        '\r\n+WTF: iam not a known message\r\n',
        '\r\n+CME ERROR: 3\r\n',
        '\r\n+CPIN: SIM PIN\r\n',
        '\r\n+CPIN: READY\r\n',
        '\r\nOK\r\n',
        '\r\nERROR\r\n'
].join("");



let atMessages: AtMessage[];

try {

        atMessages= parser(input);

} catch (error) {

        console.log(error.message);
        process.exit(1);

}


for (let atMessage of atMessages) {

        switch (atMessage.id) {
                case AtMessageId.CMGR:
                        let atMessageCMGR = <AtMessageImplementations.CMGR>atMessage;
                        console.log(atMessageCMGR);
                        break;
                case AtMessageId.CMTI:
                        let atMessageCMTI = <AtMessageImplementations.CMTI>atMessage;
                        console.log(atMessageCMTI);
                        break;
                case AtMessageId.CNUM:
                        let atMessageCNUM = <AtMessageImplementations.CNUM>atMessage;
                        console.log(atMessageCNUM);
                        break;
                case AtMessageId.ERROR:
                        let atMessageERROR= <AtMessageImplementations.ERROR>atMessage;
                        console.log(atMessageERROR);
                        break;
                default: console.log(atMessage);
        }


}