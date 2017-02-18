require("colors");

import {
        atMessagesParser,
        AtMessage
} from "../lib/index";

let atMessages: AtMessage[];
let expect: string;
let test: string;

test= "fix double quote";

atMessages = atMessagesParser([
        '\r\n+CPBR: 8,"666666666",129,""Oui""\r\n\r\nOK\r\n'
].join(""));

expect= String.raw
`[
  {
    "raw": "\r\n+CPBR: 8,\"666666666\",129,\"\"Oui\"\"\r\n",
    "id": "P_CPBR_EXEC",
    "index": 8,
    "number": "666666666",
    "text": "\"Oui\"",
    "numberingPlanId": 1,
    "typeOfNumber": 0,
    "numberingPlanIdName": "ISDN_OR_TELEPHONY",
    "typeOfNumberName": "UNKNOWN"
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
