require("colors");

import {
        atMessagesParser,
        atIds,
        AtMessage,
        AtMessageList,
        AtImps
} from "../lib/index";

let rawAtMessages = "";
let atMessages: AtMessage[];


rawAtMessages += [
        '\r\n^RSSI:99\r\n',
        '\r\n^BOOT:20952548,0,0,0,72\r\n',
        '\r\n+CMGS: 135\r\n',
        '\r\n^MODE: 3,4\r\n',
].join("");


console.log(atMessagesParser(rawAtMessages));