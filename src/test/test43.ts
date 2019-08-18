require("colors");

import {
        atMessagesParser,
        AtMessage
} from "../lib/index";

let atMessages: AtMessage[];
let expect: string;
let test: string;

test= "+CSSU URC are preceded by two rn rn";

atMessages = atMessagesParser("\r\n\r\n+CSSU: 2\r\nAT\r\r\nOK\r\n\r\n\r\n+CSSU: 3\r\n");

expect = String.raw
`[
  {
    "raw": "\r\n\r\n+CSSU: 2\r\n",
    "id": "P_CSSU_URC",
    "isUnsolicited": true
  },
  {
    "raw": "AT\r",
    "id": "ECHO"
  },
  {
    "raw": "\r\nOK\r\n",
    "id": "OK",
    "isFinal": true
  },
  {
    "raw": "\r\n\r\n+CSSU: 3\r\n",
    "id": "P_CSSU_URC",
    "isUnsolicited": true
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);

console.log(`Pass test ${test}`.green);
