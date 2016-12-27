# at-messages-parser

Parse AT message sent by a modem

Note: Alfa release, only the at messages present in the example are currently supported,
Non recognized message will not be parsed

#Usage

./example/test.ts

```` JavaScript

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

````

Outputs:

````shell
> node ./generatedJs/example/test

COMMAND_ECHO
AtMessage { id: 0, raw: 'AT\r', isUnsolicited: undefined }
COMMAND_ECHO
AtMessage { id: 0, raw: 'AT+CNUM=3,"SM"\r', isUnsolicited: undefined }
CMTI
AtMessageCMTI {
  id: 6,
  raw: '\r\n+CMTI: "SM",26\r\n',
  isUnsolicited: true,
  mem: 0,
  index: 26 }
Mem:  SM
CMGR
AtMessageCMGR {
  id: 7,
  raw: '\r\n+CMGR: 0,,26\r\n07913306092011F0040B913336766883F5000061216212807140074A351A8D56AB01\r\n',
  isUnsolicited: false,
  stat: 0,
  length: 26,
  pdu: '07913306092011F0040B913336766883F5000061216212807140074A351A8D56AB01' }
OK
AtMessage { id: 1, raw: '\r\nOK\r\n', isUnsolicited: undefined }
RSSI
AtMessage { id: 4, raw: '\r\n^RSSI:99\r\n', isUnsolicited: true }
BOOT
AtMessage {
  id: 3,
  raw: '\r\n^BOOT:20952548,0,0,0,72\r\n',
  isUnsolicited: true }
CNUM
AtMessageCNUM {
  id: 5,
  raw: '\r\n+CNUM: "CC","+8613987654321",129\r\n',
  isUnsolicited: false,
  alpha: 'CC',
  number: '+8613987654321',
  isNational: true,
  hasError: false }
CNUM
AtMessageCNUM {
  id: 5,
  raw: '\r\nERROR+CNUM: "","0636786385",129\r\n\r\n',
  isUnsolicited: false,
  alpha: '',
  number: '0636786385',
  isNational: true,
  hasError: true }
undefined
AtMessage {
  id: undefined,
  raw: '\r\n+WTF:ié"réflmmfe:eza&*\r\n',
  isUnsolicited: undefined }
ERROR
AtMessage { id: 2, raw: '\r\nERROR\r\n', isUnsolicited: undefined }
OK
AtMessage { id: 1, raw: '\r\nOK\r\n', isUnsolicited: undefined }
````