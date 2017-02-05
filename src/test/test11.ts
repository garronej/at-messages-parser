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

test= "CMGL";

atMessages = atMessagesParser([
        '\r\n+CMGL: (0-4)\r\n',
        '\r\nOK\r\n',
        '\r\n+CMGL: 0,1,,22\r\n07913306007110811094904003CF7A1A\r\n',
        '\r\nOK\r\n',
        '\r\n+CMGL: 0,1,,22\r\n07913306007110811094904003CF7A1A',
        '\r\n+CMGL: 4,0,,24\r\n07976499200007110815063404005CF7AFAFD06',
        '\r\n',
        '\r\nOK\r\n'
].join(""));

expect =
`[
  {
    "id": "+CMGL TEST",
    "raw": "\\r\\n+CMGL: (0-4)\\r\\n",
    "range": [
      0,
      4
    ]
  },
  {
    "id": "OK",
    "raw": "\\r\\nOK\\r\\n",
    "isFinal": true
  },
  {
    "id": "AT LIST",
    "raw": "\\r\\n+CMGL: 0,1,,22\\r\\n07913306007110811094904003CF7A1A\\r\\n",
    "atMessages": [
      {
        "id": "+CMGL",
        "raw": "\\r\\n+CMGL: 0,1,,22\\r\\n07913306007110811094904003CF7A1A",
        "index": 0,
        "stat": 1,
        "length": 22,
        "pdu": "07913306007110811094904003CF7A1A",
        "statName": "REC_READ"
      }
    ]
  },
  {
    "id": "OK",
    "raw": "\\r\\nOK\\r\\n",
    "isFinal": true
  },
  {
    "id": "AT LIST",
    "raw": "\\r\\n+CMGL: 0,1,,22\\r\\n07913306007110811094904003CF7A1A\\r\\n+CMGL: 4,0,,24\\r\\n07976499200007110815063404005CF7AFAFD06\\r\\n",
    "atMessages": [
      {
        "id": "+CMGL",
        "raw": "\\r\\n+CMGL: 0,1,,22\\r\\n07913306007110811094904003CF7A1A",
        "index": 0,
        "stat": 1,
        "length": 22,
        "pdu": "07913306007110811094904003CF7A1A",
        "statName": "REC_READ"
      },
      {
        "id": "+CMGL",
        "raw": "\\r\\n+CMGL: 4,0,,24\\r\\n07976499200007110815063404005CF7AFAFD06",
        "index": 4,
        "stat": 0,
        "length": 24,
        "pdu": "07976499200007110815063404005CF7AFAFD06",
        "statName": "REC_UNREAD"
      }
    ]
  },
  {
    "id": "OK",
    "raw": "\\r\\nOK\\r\\n",
    "isFinal": true
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);

