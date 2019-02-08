require("colors");

import {
        atMessagesParser,
        AtMessage
} from "../lib/index";

let atMessages: AtMessage[];
let expect: string;
let test: string;

test= "forgotten urc";

//'ATE1\r\r\nOK\r\nATE1\r\r\nOK\r\n' (Alan Ho) Maybe for later...

atMessages = atMessagesParser([
  `\r\n^STIN:0,0,0\r\n`, 
  `ATE1\r`, 
  `\r\nOK\r\n`
].join(""));

expect = String.raw
`[
  {
    "raw": "\r\n^STIN:0,0,0\r\n",
    "id": "CX_STIN_URC",
    "isUnsolicited": true
  },
  {
    "raw": "ATE1\r",
    "id": "ECHO"
  },
  {
    "raw": "\r\nOK\r\n",
    "id": "OK",
    "isFinal": true
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);

console.log(`Pass test ${test}`.green);
