require("colors");

import {
        atMessagesParser,
        AtMessage
} from "../lib/index";

let atMessages: AtMessage[];
let expect: string;
let test: string;

test = "test CRSM";

atMessages = atMessagesParser([
  `\r\n+CRSM: 144,0,"983351106111005079F8"\r\n`,
  `\r\nOK\r\n`,
  `\r\n+CRSM: 144,0\r\n`,
  `\r\nOK\r\n`,
].join(""));

expect = String.raw
`[
  {
    "raw": "\r\n+CRSM: 144,0,\"983351106111005079F8\"\r\n",
    "id": "P_CRSM_SET",
    "sw1": 144,
    "sw2": 0,
    "response": "983351106111005079F8"
  },
  {
    "raw": "\r\nOK\r\n",
    "id": "OK",
    "isFinal": true
  },
  {
    "raw": "\r\n+CRSM: 144,0\r\n",
    "id": "P_CRSM_SET",
    "sw1": 144,
    "sw2": 0
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