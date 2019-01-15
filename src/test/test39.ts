require("colors");

import {
        atMessagesParser,
        AtMessage
} from "../lib/index";

let atMessages: AtMessage[];
let expect: string;
let test: string;

test= "CMTI with negative index";

atMessages = atMessagesParser([
        '\r\n+CMTI: "SM",-1\r\n'
].join(""));

expect = String.raw
`[
  {
    "raw": "\r\n+CMTI: \"SM\",-1\r\n",
    "id": "P_CMTI_URC",
    "isUnsolicited": true,
    "mem": "SM",
    "index": -1
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2), 
`Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);
