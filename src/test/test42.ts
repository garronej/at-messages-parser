require("colors");

import {
        atMessagesParser,
        AtMessage
} from "../lib/index";

let atMessages: AtMessage[];
let expect: string;
let test: string;

test= "CSQ exec";

atMessages = atMessagesParser([
  `\r\n+CSQ: 19,99\r\n`,
  '\r\nOK\r\n',
 ].join(""));

expect = String.raw
`[
  {
    "raw": "\r\n+CSQ: 19,99\r\n",
    "id": "P_CSQ_EXEC",
    "rssi": 19,
    "gsmOrUtranCellSignalStrengthTier": "–109 dBm to –53 dBm"
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
