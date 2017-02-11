require("colors");

import {
        atMessagesParser,
        AtMessage
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

expect= String.raw
`[
  {
    "raw": "\r\n+CMGL: (0-4)\r\n",
    "id": "P_CMGL_TEST",
    "range": [
      0,
      4
    ]
  },
  {
    "raw": "\r\nOK\r\n",
    "id": "OK",
    "isFinal": true
  },
  {
    "raw": "\r\n+CMGL: 0,1,,22\r\n07913306007110811094904003CF7A1A\r\n",
    "id": "LIST",
    "atMessages": [
      {
        "raw": "\r\n+CMGL: 0,1,,22\r\n07913306007110811094904003CF7A1A",
        "id": "P_CMGL_SET",
        "index": 0,
        "stat": 1,
        "length": 22,
        "pdu": "07913306007110811094904003CF7A1A",
        "statName": "REC_READ"
      }
    ]
  },
  {
    "raw": "\r\nOK\r\n",
    "id": "OK",
    "isFinal": true
  },
  {
    "raw": "\r\n+CMGL: 0,1,,22\r\n07913306007110811094904003CF7A1A\r\n+CMGL: 4,0,,24\r\n07976499200007110815063404005CF7AFAFD06\r\n",
    "id": "LIST",
    "atMessages": [
      {
        "raw": "\r\n+CMGL: 0,1,,22\r\n07913306007110811094904003CF7A1A",
        "id": "P_CMGL_SET",
        "index": 0,
        "stat": 1,
        "length": 22,
        "pdu": "07913306007110811094904003CF7A1A",
        "statName": "REC_READ"
      },
      {
        "raw": "\r\n+CMGL: 4,0,,24\r\n07976499200007110815063404005CF7AFAFD06",
        "id": "P_CMGL_SET",
        "index": 4,
        "stat": 0,
        "length": 24,
        "pdu": "07976499200007110815063404005CF7AFAFD06",
        "statName": "REC_UNREAD"
      }
    ]
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
