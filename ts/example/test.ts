
import atOutputParser from "../index";
import { AtMessage } from "../index";
import { AtMessageId } from "../index";

let input=[
        '\r\n+CMGR: 0,,26\r\n07913306092011F0040B913336766883F5000061216212807140074A351A8D56AB01\r\n\r\nOK\r\n',
        'AT\r',
        'AT+CNUM=3,"SM"\r',
        '\r\n^BOOT:20952548,0,0,0,72\r\n',
        '\r\nERROR+CNUM: "","+393701307294",145\r\n\r\n',
        '\r\n^RSSI:99\r\n',
        '\r\n+CNUM: "CC","+8613987654321",129\r\n',
        '\r\n+WTF:ié"réflmmfe:eza&*\r\n',
        '\r\nERROR+WTF:ié"réflmmfe:eza&*\r\n\r\n',
        '\r\nOK\r\n'
].join("");



console.log("input", JSON.stringify(input));

let atMessages: AtMessage[];

try{

        atMessages= atOutputParser(input);

}catch(error){

        console.log(error.message);
        process.exit(1);

}

for( let atMessage of atMessages){

        console.log(atMessage, AtMessageId[atMessage.id])

}



