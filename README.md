# at-messages-parser

This module compile to object raw response send by a modem to AT command.

Support only *AT+CMEE=0* and *AT+CMEE=1* mode, not *AT+CMEE=2*

#Technical specifications

This module have been build according to this specification document:

https://www.paoli.cz/out/media/HUAWEI_MU609_HSPA_LGA_Modul_AT_Command_Interface_Specification_V100R002_04.pdf

#Install 

npm install garronej/at-messages-parser

#Usage

./example/sample.ts

```` JavaScript

require("colors");

import {
        atMessagesParser,
        atIds,
        AtMessage,
        AtMessageList,
        AtMessageImplementations
} from "at-messages-parser";

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

//Test ECHO

input += [
        'AT+CMEE=0\r',
        'AT+CNUM\r',
        'AT\r',
        'A/\r'
].join("");

//Test invite 

input += "\r\n> ";

//Test implemented simple

input += [
        '\r\n+CMTI: "SM",26\r\n',
        '\r\n+CDSI: "SM",0\r\n',
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
        '\r\n^SYSINFO:2,3,0,5,1,,4\r\n',
        '\r\n+CMGS: 135\r\n'
].join("");

//Test message with pdu

input += [
        '\r\n+CMGR: 0,,26\r\n07913306092011F0040B913336766883F5000061216212807140074A351A8D56AB01\r\n',
        '\r\n+CDS: 26\r\n0891683108608805F906750D91683109731147F4313050913492003130509134430000\r\n',
        '\r\n+CMT: ,24\r\n0891683108608805F9240D91683109731147F400003130505152430004F4F29C0E\r\n'
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

//Test basic, basic command often dose not respect basic format

input += [
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


input+= "\r\n";

input+= "\r\nABCDEF12323122DDDDD";

input+= "\r\n0021000B913336766883F5000038C83208FD0E29906510FA1D5220CB20F43BA4409641E87748812C83D0EF90025906A1DF2105B20C42BF430A6419847E8714\r\n+CMS ERROR: 500\r\n";

//console.log(JSON.stringify(input));

try {

        atMessages = atMessagesParser(input);

} catch (error) {

        console.log("Tests failed".red, error.message);
        process.exit(1);

}


//UsageExample

for (let atMessage of atMessages) {

        console.log(atMessage);

        switch (atMessage.id) {
                case atIds.CMGR:
                        let atMessageCMGR = atMessage as AtMessageImplementations.CMGR;

                        let length= atMessageCMGR.length;
                        let pdu= atMessageCMGR.pdu;
                        break;
                case atIds.AT_LIST:
                        let atMessageList = atMessage as AtMessageList;
                        for( let atMessage of atMessageList.atMessages ){
                                if( atMessage.id === atIds.CNUM ){
                                        let atMessageCNUM= atMessage as AtMessageImplementations.CNUM;

                                        let number= atMessageCNUM.number;
                                }
                        }
                        break;
                default:
        }

}

//Debug

console.log("If you see this all test passed successfully".green);
````

Outputs:

````shell

> node ./out/test/sample

AtMessage { id: 'OK', raw: '\r\nOK\r\n', isFinal: true }
ERROR {
  id: 'ERROR',
  raw: '\r\nERROR\r\n',
  isFinal: true,
  isError: true }
CMS_ERROR {
  id: '+CMS ERROR',
  raw: '\r\n+CMS ERROR: 301\r\n',
  isFinal: true,
  isError: true,
  code: 301,
  verbose: 'SMS service of ME reserved' }
CME_ERROR {
  id: '+CME ERROR',
  raw: '\r\n+CME ERROR: 3\r\n',
  isFinal: true,
  isError: true,
  code: 3,
  verbose: 'operation not allowed' }
AtMessage { id: 'CONNECT', raw: '\r\nCONNECT\r\n', isFinal: true }
AtMessage { id: 'RING', raw: '\r\nRING\r\n', isFinal: true }
AtMessage {
  id: 'NO CARRIER',
  raw: '\r\nNO CARRIER\r\n',
  isFinal: true,
  isError: true }
AtMessage {
  id: 'NO DIALTONE',
  raw: '\r\nNO DIALTONE\r\n',
  isFinal: true,
  isError: true }
AtMessage { id: 'BUSY', raw: '\r\nBUSY\r\n', isFinal: true, isError: true }
AtMessage {
  id: 'NO ANSWER',
  raw: '\r\nNO ANSWER\r\n',
  isFinal: true,
  isError: true }
AtMessage {
  id: 'COMMAND NOT SUPPORT',
  raw: '\r\nCOMMAND NOT SUPPORT\r\n',
  isFinal: true,
  isError: true }
AtMessage {
  id: 'TOO MANY PARAMETERS',
  raw: '\r\nTOO MANY PARAMETERS\r\n',
  isFinal: true,
  isError: true }
AtMessage { id: 'ECHO', raw: 'AT+CMEE=0\r' }
AtMessage { id: 'ECHO', raw: 'AT+CNUM\r' }
AtMessage { id: 'ECHO', raw: 'AT\r' }
AtMessage { id: 'ECHO', raw: 'A/\r' }
AtMessage { id: '>', raw: '\r\n> ', isFinal: true }
CMTI {
  id: '+CMTI',
  raw: '\r\n+CMTI: "SM",26\r\n',
  isUnsolicited: true,
  mem: 'SM',
  index: 26 }
CDSI {
  id: '+CDSI',
  raw: '\r\n+CDSI: "SM",0\r\n',
  isUnsolicited: true,
  mem: 'SM',
  index: 0 }
AtMessage { id: '^RSSI', raw: '\r\n^RSSI:99\r\n', isUnsolicited: true }
AtMessage {
  id: '^BOOT',
  raw: '\r\n^BOOT:20952548,0,0,0,72\r\n',
  isUnsolicited: true }
CPIN {
  id: '+CPIN',
  raw: '\r\n+CPIN: SIM PIN\r\n',
  pinState: 'SIM PIN' }
CPIN { id: '+CPIN', raw: '\r\n+CPIN: READY\r\n', pinState: 'READY' }
HUAWEI_SIMST {
  id: '^SIMST',
  raw: '\r\n^SIMST: 255,1\r\n',
  isUnsolicited: true,
  simState: 255,
  simStateName: 'NO_SIM',
  lock: true }
HUAWEI_SIMST {
  id: '^SIMST',
  raw: '\r\n^SIMST: 1\r\n',
  isUnsolicited: true,
  simState: 1,
  simStateName: 'VALID_SIM' }
HUAWEI_SRVST {
  id: '^SRVST',
  raw: '\r\n^SRVST: 0\r\n',
  isUnsolicited: true,
  serviceStatus: 0,
  serviceStatusName: 'NO_SERVICES' }
CMEE {
  id: '+CMEE',
  raw: '\r\n+CMEE: 1\r\n',
  reportMode: 1,
  reportModeName: 'DEBUG_INFO_CODE' }
HUAWEI_CPIN {
  id: '^CPIN',
  raw: '\r\n^CPIN: SIM PIN,3,10,3,10,3\r\n',
  pinState: 'SIM PIN',
  times: 3,
  pukTimes: 10,
  pinTimes: 3,
  puk2Times: 10,
  pin2Times: 3 }
HUAWEI_CPIN {
  id: '^CPIN',
  raw: '\r\n^CPIN: READY,,10,3,10,3\r\n',
  pinState: 'READY',
  times: undefined,
  pukTimes: 10,
  pinTimes: 3,
  puk2Times: 10,
  pin2Times: 3 }
HUAWEI_SYSINFO {
  id: '^SYSINFO',
  raw: '\r\n^SYSINFO:2,3,0,5,1,,4\r\n',
  serviceStatus: 2,
  serviceDomain: 3,
  isRoaming: false,
  sysMode: 5,
  simState: 1,
  serviceStatusName: 'VALID_SERVICES',
  serviceDomainName: 'PS_AND_CS_SERVICES',
  sysModeName: 'WCDMA',
  simStateName: 'VALID_SIM' }
CMGS { id: '+CMGS', raw: '\r\n+CMGS: 135\r\n', mr: 135 }
CMGR {
  id: '+CMGR',
  raw: '\r\n+CMGR: 0,,26\r\n07913306092011F0040B913336766883F5000061216212807140074A351A8D56AB01\r\n',
  stat: 0,
  length: 26,
  pdu: '07913306092011F0040B913336766883F5000061216212807140074A351A8D56AB01',
  statName: 'RECEIVED_UNREAD' }
AtMessage {
  id: '+CDS',
  raw: '\r\n+CDS: 26\r\n0891683108608805F906750D91683109731147F4313050913492003130509134430000\r\n' }
CMT {
  id: '+CMT',
  raw: '\r\n+CMT: ,24\r\n0891683108608805F9240D91683109731147F400003130505152430004F4F29C0E\r\n',
  isUnsolicited: true,
  length: 24,
  pdu: '0891683108608805F9240D91683109731147F400003130505152430004F4F29C0E' }
AtMessage { id: undefined, raw: '\r\n+WTF: iam not a known message\r\n' }
AtMessage { id: undefined, raw: '\r\n123456789012345\r\n' }
AtMessage { id: undefined, raw: '\r\n+CPMS: 48,50,48,50,48,50\r\n' }
AtMessageList {
  id: 'AT LIST',
  raw: '\r\n+CNUM: "","+33671651906",145\r\n\r\n',
  atMessages:
   [ CNUM {
       id: '+CNUM',
       raw: '+CNUM: "","+33671651906",145\r\n',
       alpha: '',
       number: '+33671651906',
       isNational: false,
       error: [Object] } ] }
AtMessageList {
  id: 'AT LIST',
  raw: '\r\n+CNUM: "","+33671651907",145\r\n\r\n',
  atMessages:
   [ CNUM {
       id: '+CNUM',
       raw: '+CNUM: "","+33671651907",145\r\n',
       alpha: '',
       number: '+33671651907',
       isNational: false,
       error: [Object] } ] }
AtMessageList {
  id: 'AT LIST',
  raw: '\r\n+CNUM: "","+33606894175",145\r\n+CNUM: "","+33671651906",145\r\n+CNUM: "Donn�es","",0\r\n+CNUM: "Fax","",0\r\n\r\n',
  atMessages:
   [ CNUM {
       id: '+CNUM',
       raw: '+CNUM: "","+33606894175",145\r\n',
       alpha: '',
       number: '+33606894175',
       isNational: false },
     CNUM {
       id: '+CNUM',
       raw: '+CNUM: "","+33671651906",145\r\n',
       alpha: '',
       number: '+33671651906',
       isNational: false,
       error: [Object] },
     CNUM {
       id: '+CNUM',
       raw: '+CNUM: "Donn�es","",0\r\n',
       alpha: 'Donn�es',
       number: '',
       isNational: undefined },
     CNUM {
       id: '+CNUM',
       raw: '+CNUM: "Fax","",0\r\n',
       alpha: 'Fax',
       number: '',
       isNational: undefined } ] }
AtMessageList {
  id: 'AT LIST',
  raw: '\r\n+CMGL: 0,1,,22\r\n07913306092049F0040B913336766883F500007110811094904003CF7A1A\r\n+CMGL: 4,0,,24\r\n07913396050046F7240B913376499120F200007110815063404005CF7AFAFD06\r\n',
  atMessages:
   [ CMGL {
       id: '+CMGL',
       raw: '\r\n+CMGL: 0,1,,22\r\n07913306092049F0040B913336766883F500007110811094904003CF7A1A',
       index: 0,
       stat: 1,
       length: 22,
       pdu: '07913306092049F0040B913336766883F500007110811094904003CF7A1A',
       statName: 'RECEIVED_READ' },
     CMGL {
       id: '+CMGL',
       raw: '\r\n+CMGL: 4,0,,24\r\n07913396050046F7240B913376499120F200007110815063404005CF7AFAFD06',
       index: 4,
       stat: 0,
       length: 24,
       pdu: '07913396050046F7240B913376499120F200007110815063404005CF7AFAFD06',
       statName: 'RECEIVED_UNREAD' } ] }
AtMessage { id: 'ECHO', raw: 'ATI\r' }
AtMessage { id: 'ECHO', raw: '07110815063404005CF7AFAFD06' }
AtMessage { id: 'ECHO', raw: '\r\n' }
AtMessage { id: 'ECHO', raw: 'ATI\r' }
AtMessage {
  id: undefined,
  raw: '\r\nManufacturer: huawei\r\nModel: K3520\r\nRevision: 11.314.12.02.00\r\nIMEI: 353284020952548\r\n+GCAP: +CGSM,+DS,+ES\r\n' }
AtMessage { id: 'OK', raw: '\r\nOK\r\n', isFinal: true }
AtMessage { id: 'ECHO', raw: '\r\n' }
AtMessage { id: 'ECHO', raw: '\r\n' }
AtMessage { id: 'ECHO', raw: 'ABCDEF12323122DDDDD' }
AtMessage { id: 'ECHO', raw: '\r\n' }
AtMessage {
  id: 'ECHO',
  raw: '0021000B913336766883F5000038C83208FD0E29906510FA1D5220CB20F43BA4409641E87748812C83D0EF90025906A1DF2105B20C42BF430A6419847E8714' }
CMS_ERROR {
  id: '+CMS ERROR',
  raw: '\r\n+CMS ERROR: 500\r\n',
  isFinal: true,
  isError: true,
  code: 500,
  verbose: 'unknown error' }
If you see this all test passed successfully
````