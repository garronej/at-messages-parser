
import {
        atMessagesParser,
        AtMessageId,
        AtMessage,
        AtMessageList,
        AtMessageImplementations
} from "../lib/index";

let input = "";

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
        'AT\r'
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
        '\r\n123456789012345\r\n'
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


//console.log(JSON.stringify(input));

let atMessages: AtMessage[];

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

for( let atMessage of atMessages ) console.log(atMessage);
