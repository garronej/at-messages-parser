require("colors");

import {
        atMessagesParser,
        AtMessage
} from "../lib/index";

let atMessages: AtMessage[];
let expect: string;
let test: string;


test= "unknown messages";

atMessages = atMessagesParser([
  '\r\nOK\r\n',
  '\r\n+CPIN: SIM PIN\r\n',
  '\r\nOK\r\n',
  "\r\n" + [
    "Manufacturer: huawei\r\n",
    "Model: K3520\r\n",
    "Revision: 11.314.12.02.00\r\n",
    "IMEI: 353284020952548\r\n",
    "+GCAP: +CGSM,+DS,+ES"
  ].join("") + "\r\n",
  '\r\n^BOOT:37478870,0,0,0,77\r\n',
  "\r\nOK\r\n",
  '\r\n+CMT: ,13\r\n0891683108608805F9240D91683109\r\n'
].join(""));

expect =
`[
  {
    "raw": "\\r\\nOK\\r\\n",
    "id": "OK",
    "isFinal": true
  },
  {
    "raw": "\\r\\n+CPIN: SIM PIN\\r\\n",
    "id": "P_CPIN_READ",
    "pinState": "SIM PIN"
  },
  {
    "raw": "\\r\\nOK\\r\\n",
    "id": "OK",
    "isFinal": true
  },
  {
    "raw": "\\r\\nManufacturer: huawei\\r\\nModel: K3520\\r\\nRevision: 11.314.12.02.00\\r\\nIMEI: 353284020952548\\r\\n+GCAP: +CGSM,+DS,+ES\\r\\n"
  },
  {
    "raw": "\\r\\n^BOOT:37478870,0,0,0,77\\r\\n",
    "id": "CX_BOOT_URC",
    "isUnsolicited": true
  },
  {
    "raw": "\\r\\nOK\\r\\n",
    "id": "OK",
    "isFinal": true
  },
  {
    "raw": "\\r\\n+CMT: ,13\\r\\n0891683108608805F9240D91683109\\r\\n",
    "id": "P_CMT_URC",
    "isUnsolicited": true,
    "length": 13,
    "pdu": "0891683108608805F9240D91683109"
  }
]`;

console.assert(expect === JSON.stringify(atMessages, null, 2),
  `Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);
