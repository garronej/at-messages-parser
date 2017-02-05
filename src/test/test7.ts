require("colors");

import {
        atMessagesParser,
        atIds,
        AtMessage,
        AtMessageList,
        AtImps
} from "../lib/index";

let atMessages: AtMessage[];
let expect: string;
let test: string;

test= "final messages";

atMessages = atMessagesParser([
  '\r\nERROR\r\n',
  '\r\nCONNECT\r\n',
  '\r\nRING\r\n',
  '\r\nNO CARRIER\r\n',
  '\r\nNO DIALTONE\r\n',
  '\r\nBUSY\r\n',
  '\r\nNO ANSWER\r\n',
  '\r\nCOMMAND NOT SUPPORT\r\n',
  '\r\nTOO MANY PARAMETERS\r\n'
].join(""));

expect = 
`[
  {
    "id": "ERROR",
    "raw": "\\r\\nERROR\\r\\n",
    "isFinal": true,
    "isError": true
  },
  {
    "id": "CONNECT",
    "raw": "\\r\\nCONNECT\\r\\n",
    "isFinal": true
  },
  {
    "id": "RING",
    "raw": "\\r\\nRING\\r\\n",
    "isFinal": true
  },
  {
    "id": "NO CARRIER",
    "raw": "\\r\\nNO CARRIER\\r\\n",
    "isFinal": true,
    "isError": true
  },
  {
    "id": "NO DIALTONE",
    "raw": "\\r\\nNO DIALTONE\\r\\n",
    "isFinal": true,
    "isError": true
  },
  {
    "id": "BUSY",
    "raw": "\\r\\nBUSY\\r\\n",
    "isFinal": true,
    "isError": true
  },
  {
    "id": "NO ANSWER",
    "raw": "\\r\\nNO ANSWER\\r\\n",
    "isFinal": true,
    "isError": true
  },
  {
    "id": "COMMAND NOT SUPPORT",
    "raw": "\\r\\nCOMMAND NOT SUPPORT\\r\\n",
    "isFinal": true,
    "isError": true
  },
  {
    "id": "TOO MANY PARAMETERS",
    "raw": "\\r\\nTOO MANY PARAMETERS\\r\\n",
    "isFinal": true,
    "isError": true
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);
