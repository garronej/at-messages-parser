# at-messages-parser

Parse AT message sent by a modem

Note: Alfa release, only the at messages present in the example are currently supported,
Non recognized message will not be parsed

Support only *AT+CMEE=0* and *AT+CMEE=1* mode, not *AT+CMEE=2* with debug info on modem error.

#Usage

./example/test.ts

```` JavaScript

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
        '\r\nOK\r\n',
        '\r\nERROR\r\n'
].join("");



let atMessages: AtMessage[];

try {

        atMessages = parser(input);

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
                default: console.log(atMessage);
        }


}

````

Outputs:

````shell
> node ./generatedJs/example/test

AtMessage { id: 0, raw: 'AT+CNUM=3,"SM"\r', idName: 'AT_COMMAND' }
CMTI {
  id: 6,
  raw: '\r\n+CMTI: "SM",26\r\n',
  idName: 'CMTI',
  mem: 0,
  index: 26,
  memName: 'SM' }
AtMessage {
  id: 4,
  raw: '\r\n^RSSI:99\r\n',
  idName: 'RSSI',
  isUnsolicited: true }
AtMessage {
  id: 3,
  raw: '\r\n^BOOT:20952548,0,0,0,72\r\n',
  idName: 'BOOT',
  isUnsolicited: true }
CNUM {
  id: 5,
  raw: '\r\n+CME ERROR: 25+CNUM: "","+33671651906",145\r\n\r\n',
  idName: 'CNUM',
  alpha: '',
  number: '+33671651906',
  isNational: false,
  hasError: true,
  errorCode: 25 }
CNUM {
  id: 5,
  raw: '\r\nERROR+CNUM: "","+33671651907",145\r\n\r\n',
  idName: 'CNUM',
  alpha: '',
  number: '+33671651907',
  isNational: false,
  hasError: true }
CNUM {
  id: 5,
  raw: '\r\n+CNUM: "CC","+8613987654321",129\r\n',
  idName: 'CNUM',
  alpha: 'CC',
  number: '+8613987654321',
  isNational: true }
CMGR {
  id: 7,
  raw: '\r\n+CMGR: 0,,26\r\n07913306092011F0040B913336766883F5000061216212807140074A351A8D56AB01\r\n',
  idName: 'CMGR',
  stat: 0,
  length: 26,
  pdu: '07913306092011F0040B913336766883F5000061216212807140074A351A8D56AB01' }
AtMessage { id: undefined, raw: '\r\n+WTF: iam not a known message\r\n' }
AtMessage { id: 1, raw: '\r\nOK\r\n', idName: 'OK' }
AtMessage { id: 2, raw: '\r\nERROR\r\n', idName: 'ERROR' }

````