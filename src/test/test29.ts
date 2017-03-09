require("colors");

import {
        atMessagesParser,
        AtMessage
} from "../lib/index";

let atMessages: AtMessage[];
let expect: string;
let test: string;

test= "RING as URC 2";

atMessages = atMessagesParser([
  '\r\n+CPIN: SIM PIN\r\n',
  '\r\nOK\r\n',
  '\r\nRING\r\n',
  '\r\nOK\r\n'
].join(""));

expect= String.raw
`[
  {
    "raw": "\r\n+CPIN: SIM PIN\r\n",
    "id": "P_CPIN_READ",
    "pinState": "SIM PIN"
  },
  {
    "raw": "\r\nOK\r\n",
    "id": "OK",
    "isFinal": true
  },
  {
    "raw": "\r\nRING\r\n",
    "id": "RING_URC",
    "isUnsolicited": true
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
