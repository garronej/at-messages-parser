# at-messages-parser

This module compile to object raw response send by a modem to AT command.

Support only *AT+CMEE=0* and *AT+CMEE=1* mode, not *AT+CMEE=2*

#Install 

npm install garronej/at-messages-parser

#Usage

./example/test.ts

```` JavaScript


import {
        atMessagesParser,
        AtMessageId,
        AtMessage,
        AtMessageList,
        AtMessageImplementations
} from "../lib/index";

let input = "";
let atMessages: AtMessage[];

//Test Final result code

input += [
        '\r\nOK\r\n',
        '\r\nERROR\r\n',
        '\r\n+CMS ERROR: 301\r\n',
        '\r\n+CME ERROR: 3\r\n',
        '\r\nCONNECT\r\n',
        '\r\nRING\r\n',
        '\r\nNO CARRIER\r\n',
        '\r\nNO DIALTONE\r\n',
        '\r\nBUSY\r\n',
        '\r\nNO ANSWER\r\n',
        '\r\nCOMMAND NOT SUPPORT\r\n',
        '\r\nTOO MANY PARAMETERS\r\n',
].join("");


//Test AT_ECHO

input += [
        'AT+CMEE=0\r',
        'AT+CNUM\r',
        'AT\r',
        'A/\r',
        'AT+CMGS=18\r0891683108608805F931000B813109731147F40000FF04F4F29C0E\u001a'
].join("");

//Test implemented simple

input += [
        '\r\n+CMTI: "SM",26\r\n',
        '\r\n^RSSI:99\r\n',
        '\r\n^BOOT:20952548,0,0,0,72\r\n',
        '\r\n+CPIN: SIM PIN\r\n',
        '\r\n+CPIN: READY\r\n',
        '\r\n^SIMST: 255,1\r\n',
        '\r\n^SIMST: 1\r\n',
        '\r\n^SRVST: 0\r\n',
        '\r\n+CMEE: 1\r\n',
        '\r\n^CPIN: SIM PIN,3,10,3,10,3\r\n',
        '\r\n^CPIN: READY,,10,3,10,3\r\n',
        '\r\n^SYSINFO:2,3,0,5,1,,4\r\n'
].join("");


//Test message with pdu

input += [
        '\r\n+CMGR: 0,,26\r\n07913306092011F0040B913336766883F5000061216212807140074A351A8D56AB01\r\n'
].join("");


//Test message not implemented


input += [
        '\r\n+WTF: iam not a known message\r\n',
        '\r\n123456789012345\r\n',
        '\r\n+CPMS: 48,50,48,50,48,50\r\n'
].join("");

//Test message multiline

input += [
        '\r\n+CME ERROR: 25+CNUM: "","+33671651906",145\r\n\r\n',
        '\r\nERROR+CNUM: "","+33671651907",145\r\n\r\n',
        [
                '\r\n',
                '+CNUM: "","+33606894175",145\r\n',
                '+CME ERROR: 25+CNUM: "","+33671651906",145\r\n',
                '+CNUM: "Donn�es","",0\r\n',
                '+CNUM: "Fax","",0\r\n',
                '\r\n'
        ].join("")
].join("");


//Special case, with pdu and multiline

input += [
        '\r\n+CMGL: 0,1,,22\r\n07913306092049F0040B913336766883F500007110811094904003CF7A1A',
        '\r\n+CMGL: 4,0,,24\r\n07913396050046F7240B913376499120F200007110815063404005CF7AFAFD06',
        '\r\n'
].join("");


//console.log(JSON.stringify(input));


try {

        atMessages = atMessagesParser(input);

} catch (error) {

        console.log(error.message);
        process.exit(1);

}


for (let atMessage of atMessages) {

        switch (atMessage.id) {
                case AtMessageId.AT_LIST:
                        let atMessageList = <AtMessageList>atMessage;
                        console.log(atMessageList);
                        break;
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
                        let atMessageERROR = <AtMessageImplementations.ERROR>atMessage;
                        console.log(atMessageERROR);
                        break;
                case AtMessageId.CME_ERROR:
                        let atMessageCME_ERROR = <AtMessageImplementations.CME_ERROR>atMessage;
                        console.log(atMessageCME_ERROR);
                        break;
                case AtMessageId.CMS_ERROR:
                        let atMessageCMS_ERROR = <AtMessageImplementations.CMS_ERROR>atMessage;
                        console.log(atMessageCMS_ERROR);
                        break;
                case AtMessageId.HUAWEI_SIMST:
                        let atMessageHuaweiSIMST = <AtMessageImplementations.HUAWEI_SIMST>atMessage;
                        console.log(atMessageHuaweiSIMST);
                        break;
                case AtMessageId.HUAWEI_SRVST:
                        let atMessageHuaweiSRVST = <AtMessageImplementations.HUAWEI_SRVST>atMessage;
                        console.log(atMessageHuaweiSRVST);
                        break;
                case AtMessageId.CMEE:
                        let atMessageCMEE = <AtMessageImplementations.CMEE>atMessage;
                        console.log(atMessageCMEE);
                        break;
                case AtMessageId.HUAWEI_CPIN:
                        let atMessageHuaweiCPIN = <AtMessageImplementations.HUAWEI_CPIN>atMessage;
                        console.log(atMessageHuaweiCPIN);
                        break;
                case AtMessageId.HUAWEI_SYSINFO:
                        let atMessageHuaweiSYSINFO = <AtMessageImplementations.HUAWEI_SYSINFO>atMessage;
                        console.log(atMessageHuaweiSYSINFO);
                        break;
                default: console.log(atMessage);
        }

}

//Test basic, basic command often dose not respect basic format

input = [
        "ATI\r",
        "\r\n",
        [
                "Manufacturer: huawei\r\n",
                "Model: K3520\r\n",
                "Revision: 11.314.12.02.00\r\n",
                "IMEI: 353284020952548\r\n",
                "+GCAP: +CGSM,+DS,+ES"
        ].join(""),
        "\r\n",
        "\r\nOK\r\n"
].join("");


//console.log(JSON.stringify(input));

try {

        atMessages = atMessagesParser(input);

} catch (error) {

        console.log(error.message);
        process.exit(1);

}

for (let atMessage of atMessages) console.log(atMessage);

````

Outputs:

````shell
> node ./generatedJs/example/test


AtMessage { raw: '\r\nOK\r\n', idName: 'OK', isFinal: true }
ERROR {
  raw: '\r\nERROR\r\n',
  idName: 'ERROR',
  isFinal: true,
  isError: true }
CMS_ERROR {
  raw: '\r\n+CMS ERROR: 301\r\n',
  idName: 'CMS_ERROR',
  isFinal: true,
  isError: true,
  code: 301,
  verbose: 'SMS service of ME reserved' }
CME_ERROR {
  raw: '\r\n+CME ERROR: 3\r\n',
  idName: 'CME_ERROR',
  isFinal: true,
  isError: true,
  code: 3,
  verbose: 'operation not allowed' }
AtMessage { raw: '\r\nCONNECT\r\n', idName: 'CONNECT', isFinal: true }
AtMessage { raw: '\r\nRING\r\n', idName: 'RING', isFinal: true }
AtMessage {
  raw: '\r\nNO CARRIER\r\n',
  idName: 'NO_CARRIER',
  isFinal: true,
  isError: true }
AtMessage {
  raw: '\r\nNO DIALTONE\r\n',
  idName: 'NO_DIALTONE',
  isFinal: true,
  isError: true }
AtMessage {
  raw: '\r\nBUSY\r\n',
  idName: 'BUSY',
  isFinal: true,
  isError: true }
AtMessage {
  raw: '\r\nNO ANSWER\r\n',
  idName: 'NO_ANSWER',
  isFinal: true,
  isError: true }
AtMessage {
  raw: '\r\nCOMMAND NOT SUPPORT\r\n',
  idName: 'COMMAND_NOT_SUPPORT',
  isFinal: true,
  isError: true }
AtMessage {
  raw: '\r\nTOO MANY PARAMETERS\r\n',
  idName: 'TOO_MANY_PARAMETERS',
  isFinal: true,
  isError: true }
AtMessage { raw: 'AT+CMEE=0\r', idName: 'AT_COMMAND' }
AtMessage { raw: 'AT+CNUM\r', idName: 'AT_COMMAND' }
AtMessage { raw: 'AT\r', idName: 'AT_COMMAND' }
AtMessage { raw: 'A/\r', idName: 'AT_COMMAND' }
AtMessage {
  raw: 'AT+CMGS=18\r0891683108608805F931000B813109731147F40000FF04F4F29C0E\u001a',
  idName: 'AT_COMMAND' }
CMTI {
  raw: '\r\n+CMTI: "SM",26\r\n',
  idName: 'CMTI',
  index: 26,
  memName: 'SM' }
AtMessage {
  raw: '\r\n^RSSI:99\r\n',
  idName: 'HUAWEI_RSSI',
  isUnsolicited: true }
AtMessage {
  raw: '\r\n^BOOT:20952548,0,0,0,72\r\n',
  idName: 'HUAWEI_BOOT',
  isUnsolicited: true }
CPIN {
  raw: '\r\n+CPIN: SIM PIN\r\n',
  idName: 'CPIN',
  pinStateName: 'SIM_PIN' }
CPIN {
  raw: '\r\n+CPIN: READY\r\n',
  idName: 'CPIN',
  pinStateName: 'READY' }
HUAWEI_SIMST {
  raw: '\r\n^SIMST: 255,1\r\n',
  idName: 'HUAWEI_SIMST',
  isUnsolicited: true,
  simState: 255,
  simStateName: 'NO_SIM',
  lock: true }
HUAWEI_SIMST {
  raw: '\r\n^SIMST: 1\r\n',
  idName: 'HUAWEI_SIMST',
  isUnsolicited: true,
  simState: 1,
  simStateName: 'VALID_SIM' }
HUAWEI_SRVST {
  raw: '\r\n^SRVST: 0\r\n',
  idName: 'HUAWEI_SRVST',
  isUnsolicited: true,
  serviceStatus: 0,
  serviceStatusName: 'NO_SERVICES' }
CMEE {
  raw: '\r\n+CMEE: 1\r\n',
  idName: 'CMEE',
  reportMode: 1,
  reportModeName: 'DEBUG_INFO_CODE' }
HUAWEI_CPIN {
  raw: '\r\n^CPIN: SIM PIN,3,10,3,10,3\r\n',
  idName: 'HUAWEI_CPIN',
  times: 3,
  pukTimes: 10,
  pinTimes: 3,
  puk2Times: 10,
  pin2Times: 3,
  pinStateName: 'SIM_PIN' }
HUAWEI_CPIN {
  raw: '\r\n^CPIN: READY,,10,3,10,3\r\n',
  idName: 'HUAWEI_CPIN',
  times: undefined,
  pukTimes: 10,
  pinTimes: 3,
  puk2Times: 10,
  pin2Times: 3,
  pinStateName: 'READY' }
HUAWEI_SYSINFO {
  raw: '\r\n^SYSINFO:2,3,0,5,1,,4\r\n',
  idName: 'HUAWEI_SYSINFO',
  serviceStatus: 2,
  serviceDomain: 3,
  isRoaming: false,
  sysMode: 5,
  simState: 1,
  serviceStatusName: 'VALID_SERVICES',
  serviceDomainName: 'PS_AND_CS_SERVICES',
  sysModeName: 'WCDMA',
  simStateName: 'VALID_SIM' }
CMGR {
  raw: '\r\n+CMGR: 0,,26\r\n07913306092011F0040B913336766883F5000061216212807140074A351A8D56AB01\r\n',
  idName: 'CMGR',
  stat: 0,
  length: 26,
  pdu: '07913306092011F0040B913336766883F5000061216212807140074A351A8D56AB01',
  statName: 'RECEIVED_UNREAD' }
AtMessage { raw: '\r\n+WTF: iam not a known message\r\n' }
AtMessage { raw: '\r\n123456789012345\r\n' }
AtMessage { raw: '\r\n+CPMS: 48,50,48,50,48,50\r\n' }
AtMessageList {
  raw: '\r\n+CNUM: "","+33671651906",145\r\n\r\n',
  idName: 'AT_LIST',
  atMessages:
   [ CNUM {
       raw: '+CNUM: "","+33671651906",145\r\n',
       idName: 'CNUM',
       alpha: '',
       number: '+33671651906',
       isNational: false,
       error: [Object] } ] }
AtMessageList {
  raw: '\r\n+CNUM: "","+33671651907",145\r\n\r\n',
  idName: 'AT_LIST',
  atMessages:
   [ CNUM {
       raw: '+CNUM: "","+33671651907",145\r\n',
       idName: 'CNUM',
       alpha: '',
       number: '+33671651907',
       isNational: false,
       error: [Object] } ] }
AtMessageList {
  raw: '\r\n+CNUM: "","+33606894175",145\r\n+CNUM: "","+33671651906",145\r\n+CNUM: "Donn�es","",0\r\n+CNUM: "Fax","",0\r\n\r\n',
  idName: 'AT_LIST',
  atMessages:
   [ CNUM {
       raw: '+CNUM: "","+33606894175",145\r\n',
       idName: 'CNUM',
       alpha: '',
       number: '+33606894175',
       isNational: false },
     CNUM {
       raw: '+CNUM: "","+33671651906",145\r\n',
       idName: 'CNUM',
       alpha: '',
       number: '+33671651906',
       isNational: false,
       error: [Object] },
     CNUM {
       raw: '+CNUM: "Donn�es","",0\r\n',
       idName: 'CNUM',
       alpha: 'Donn�es',
       number: '',
       isNational: undefined },
     CNUM {
       raw: '+CNUM: "Fax","",0\r\n',
       idName: 'CNUM',
       alpha: 'Fax',
       number: '',
       isNational: undefined } ] }
AtMessageList {
  raw: '\r\n+CMGL: 0,1,,22\r\n07913306092049F0040B913336766883F500007110811094904003CF7A1A\r\n+CMGL: 4,0,,24\r\n07913396050046F7240B913376499120F200007110815063404005CF7AFAFD06\r\n',
  idName: 'AT_LIST',
  atMessages:
   [ CMGL {
       raw: '\r\n+CMGL: 0,1,,22\r\n07913306092049F0040B913336766883F500007110811094904003CF7A1A',
       idName: 'CMGL',
       index: 0,
       stat: 1,
       length: 22,
       pdu: '07913306092049F0040B913336766883F500007110811094904003CF7A1A',
       statName: 'RECEIVED_READ' },
     CMGL {
       raw: '\r\n+CMGL: 4,0,,24\r\n07913396050046F7240B913376499120F200007110815063404005CF7AFAFD06',
       idName: 'CMGL',
       index: 4,
       stat: 0,
       length: 24,
       pdu: '07913396050046F7240B913376499120F200007110815063404005CF7AFAFD06',
       statName: 'RECEIVED_UNREAD' } ] }
AtMessage { raw: 'ATI\r', idName: 'AT_COMMAND' }
AtMessage {
  raw: '\r\nManufacturer: huawei\r\nModel: K3520\r\nRevision: 11.314.12.02.00\r\nIMEI: 353284020952548\r\n+GCAP: +CGSM,+DS,+ES\r\n' }
AtMessage { raw: '\r\nOK\r\n', idName: 'OK', isFinal: true }

````