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

test= "unsolicited";

expect=
`[
  {
    "id": "+CMTI",
    "raw": "\\r\\n+CMTI: \\"SM\\",26\\r\\n",
    "isUnsolicited": true,
    "mem": "SM",
    "index": 26
  },
  {
    "id": "+CDSI",
    "raw": "\\r\\n+CDSI: \\"SM\\",0\\r\\n",
    "isUnsolicited": true,
    "mem": "SM",
    "index": 0
  },
  {
    "id": "^BOOT",
    "raw": "\\r\\n^BOOT:20952548,0,0,0,72\\r\\n",
    "isUnsolicited": true
  },
  {
    "id": "^RSSI",
    "raw": "\\r\\n^RSSI:99\\r\\n",
    "isUnsolicited": true
  },
  {
    "id": "^SIMST",
    "raw": "\\r\\n^SIMST: 255,1\\r\\n",
    "isUnsolicited": true,
    "simState": 255,
    "simStateName": "NO_SIM",
    "lock": true
  },
  {
    "id": "^SRVST",
    "raw": "\\r\\n^SRVST: 0\\r\\n",
    "isUnsolicited": true,
    "serviceStatus": 0,
    "serviceStatusName": "NO_SERVICES"
  },
  {
    "id": "^MODE",
    "raw": "\\r\\n^MODE: 3,4\\r\\n",
    "isUnsolicited": true,
    "sysMode": 3,
    "sysSubMode": 4,
    "sysModeName": "GSM_GPRS",
    "sysSubModeName": "WCDMA"
  }
]`;

atMessages = atMessagesParser([
        '\r\n+CMTI: "SM",26\r\n',
        '\r\n+CDSI: "SM",0\r\n',
        '\r\n^BOOT:20952548,0,0,0,72\r\n',
        '\r\n^RSSI:99\r\n',
        '\r\n^SIMST: 255,1\r\n',
        '\r\n^SRVST: 0\r\n',
        '\r\n^MODE: 3,4\r\n'
].join(""));

console.assert(expect === JSON.stringify(atMessages, null, 2), 
`Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);

test= "unsolicited pdu";

expect=
`[
  {
    "id": "+CMT",
    "raw": "\\r\\n+CMT: ,13\\r\\n0891683108608805F9240D91683109\\r\\n",
    "isUnsolicited": true,
    "length": 13,
    "pdu": "0891683108608805F9240D91683109"
  },
  {
    "id": "+CDS",
    "raw": "\\r\\n+CDS: 12\\r\\n0891683108608805509134430000\\r\\n",
    "isUnsolicited": true,
    "length": 12,
    "pdu": "0891683108608805509134430000"
  }
]`;

atMessages = atMessagesParser([
        '\r\n+CMT: ,13\r\n0891683108608805F9240D91683109\r\n',
        '\r\n+CDS: 12\r\n0891683108608805509134430000\r\n',
].join(""));


test= "single line atMessage";









console.assert(expect === JSON.stringify(atMessages, null, 2), 
`Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);

test= "reordering 1";

expect=
`[
  {
    "id": "^SYSINFO",
    "raw": "\\r\\n^SYSINFO:2,3,0,5,1,,4\\r\\n",
    "serviceStatus": 2,
    "serviceDomain": 3,
    "isRoaming": false,
    "sysMode": 5,
    "simState": 1,
    "sysSubMode": 4,
    "serviceStatusName": "VALID_SERVICES",
    "serviceDomainName": "PS_AND_CS_SERVICES",
    "sysSubModeName": "WCDMA",
    "sysModeName": "WCDMA",
    "simStateName": "VALID_SIM"
  },
  {
    "id": "+CMTI",
    "raw": "\\r\\n+CMTI: \\"SM\\",26\\r\\n",
    "isUnsolicited": true,
    "mem": "SM",
    "index": 26
  },
  {
    "id": "OK",
    "raw": "\\r\\nOK\\r\\n",
    "isFinal": true
  },
  {
    "id": "+CMTI",
    "raw": "\\r\\n+CMTI: \\"SM\\",26\\r\\n",
    "isUnsolicited": true,
    "mem": "SM",
    "index": 26
  }
]`;

atMessages = atMessagesParser([
        '\r\n^SYSINFO:2,3,0,5,1,,4\r\n',
        '\r\n+CMTI: "SM",26\r\n',
        '\r\nOK\r\n',
        '\r\n+CMTI: "SM",26\r\n'
].join(""));

console.assert(expect === JSON.stringify(atMessages, null, 2), 
`Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);


test= "reordering 2";

expect=
`[
  {
    "id": "^SYSINFO",
    "raw": "\\r\\n^SYSINFO:2,3,0,5,1,,4\\r\\n",
    "serviceStatus": 2,
    "serviceDomain": 3,
    "isRoaming": false,
    "sysMode": 5,
    "simState": 1,
    "sysSubMode": 4,
    "serviceStatusName": "VALID_SERVICES",
    "serviceDomainName": "PS_AND_CS_SERVICES",
    "sysSubModeName": "WCDMA",
    "sysModeName": "WCDMA",
    "simStateName": "VALID_SIM"
  },
  {
    "id": "+CMTI",
    "raw": "\\r\\n+CMTI: \\"SM\\",26\\r\\n",
    "isUnsolicited": true,
    "mem": "SM",
    "index": 26
  },
  {
    "id": "OK",
    "raw": "\\r\\nOK\\r\\n",
    "isFinal": true
  }
]`;

atMessages = atMessagesParser([
        '\r\n^SYSIN',
        '\r\n+CMTI: "SM",26\r\n',
        'FO:2,3,0,5,1,,4\r\n',
        '\r\nOK\r\n'
].join(""));

console.assert(expect === JSON.stringify(atMessages, null, 2), 
`Fail test ${test}`.red);
console.log(`Pass test ${test}`.green);

console.log("All tests passed".green);



/*

Phase2= 'ID_ES_ERROR' 'REST' function(id, rest){

        var atIds= this.defs.atIds;
        var AtImps= this.defs.AtImps;
        var AtMessage= this.defs.AtMessage;

        var atMessage;
        var raw= "\r\n" + id + rest + "\r\n";
        var code= parseInt(rest.match(/^:\ ?([0-9]+)$/)[1]);

        switch (id) {
                case atIds.CME_ERROR:
                        atMessage = new AtImps.CME_ERROR(raw, code);
                        break;
                case atIds.CMS_ERROR:
                        atMessage = new AtImps.CMS_ERROR(raw, code);
                        break;
        }

        this.atMessages.push(atMessage);

*/