require("colors");

import {
        atMessagesParser,
        AtMessage
} from "../lib/index";

let atMessages: AtMessage[];
let expect: string;
let test: string;

test= "final messages";

atMessages = atMessagesParser([
  '\r\nERROR\r\n',
  '\r\nCONNECT\r\n',
  '\r\nNO CARRIER\r\n',
  '\r\nNO DIALTONE\r\n',
  '\r\nBUSY\r\n',
  '\r\nNO ANSWER\r\n',
  '\r\nCOMMAND NOT SUPPORT\r\n',
  '\r\nTOO MANY PARAMETERS\r\n'
].join(""));

expect= String.raw
`[
  {
    "raw": "\r\nERROR\r\n",
    "id": "ERROR",
    "isFinal": true,
    "isError": true
  },
  {
    "raw": "\r\nCONNECT\r\n",
    "id": "CONNECT",
    "isFinal": true
  },
  {
    "raw": "\r\nNO CARRIER\r\n",
    "id": "NO_CARRIER",
    "isFinal": true,
    "isError": true
  },
  {
    "raw": "\r\nNO DIALTONE\r\n",
    "id": "NO_DIALTONE",
    "isFinal": true,
    "isError": true
  },
  {
    "raw": "\r\nBUSY\r\n",
    "id": "BUSY",
    "isFinal": true,
    "isError": true
  },
  {
    "raw": "\r\nNO ANSWER\r\n",
    "id": "NO_ANSWER",
    "isFinal": true,
    "isError": true
  },
  {
    "raw": "\r\nCOMMAND NOT SUPPORT\r\n",
    "id": "COMMAND_NOT_SUPPORT",
    "isFinal": true,
    "isError": true
  },
  {
    "raw": "\r\nTOO MANY PARAMETERS\r\n",
    "id": "TOO_MANY_PARAMETERS",
    "isFinal": true,
    "isError": true
  }
]`;


console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);
