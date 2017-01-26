require("colors");

import {
        atMessagesParser,
        atIds,
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






