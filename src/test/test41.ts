require("colors");

import {
        atMessagesParser,
        AtMessage
} from "../lib/index";

let atMessages: AtMessage[];
let expect: string;
let test: string;

test= "RSSI urc";


atMessages = atMessagesParser([
  `\r\n^RSSI: 0\r\n`, 
  `\r\n^RSSI: 1\r\n`, 
  `\r\n^RSSI: 23\r\n`, 
  `\r\n^RSSI: 31\r\n`, 
  `\r\n^RSSI: 99\r\n`, 
].join(""));

expect = String.raw
`[
  {
    "raw": "\r\n^RSSI: 0\r\n",
    "id": "CX_RSSI_URC",
    "isUnsolicited": true,
    "rssi": 0,
    "gsmOrUtranCellSignalStrengthTier": "<=-113 dBm"
  },
  {
    "raw": "\r\n^RSSI: 1\r\n",
    "id": "CX_RSSI_URC",
    "isUnsolicited": true,
    "rssi": 1,
    "gsmOrUtranCellSignalStrengthTier": "-111 dBm"
  },
  {
    "raw": "\r\n^RSSI: 23\r\n",
    "id": "CX_RSSI_URC",
    "isUnsolicited": true,
    "rssi": 23,
    "gsmOrUtranCellSignalStrengthTier": "–109 dBm to –53 dBm"
  },
  {
    "raw": "\r\n^RSSI: 31\r\n",
    "id": "CX_RSSI_URC",
    "isUnsolicited": true,
    "rssi": 31,
    "gsmOrUtranCellSignalStrengthTier": "≥ –51 dBm"
  },
  {
    "raw": "\r\n^RSSI: 99\r\n",
    "id": "CX_RSSI_URC",
    "isUnsolicited": true,
    "rssi": 99,
    "gsmOrUtranCellSignalStrengthTier": "Unknown or undetectable"
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);

console.log(`Pass test ${test}`.green);
