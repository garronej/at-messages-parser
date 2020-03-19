require("colors");

import {
        getSerialPortParser,
        AtMessage
} from "../lib/index";
import { EventEmitter } from "events";
import { readFileSync } from "fs";

let atMessages: AtMessage[];
let expect: string;
let expectOk: string;
let expectUrc: string;
let test: string;

test = "test serial parser common use case";

let rawAtMessages = readFileSync(
  __dirname + "/../../res/longInput2.txt",
  { "encoding": "utf8" }
);

let [p1,p2]= rawAtMessages.split("\n***\n");

p1= p1.replace(/\\n/g, "\n");
p1= p1.replace(/\\r/g, "\r");
p1= p1.replace(/\\"/g, '"');

p2= p2.replace(/\\n/g, "\n");
p2= p2.replace(/\\r/g, "\r");
p2= p2.replace(/\\"/g, '"');


let emitter = new EventEmitter();

let success = false;

emitter.once("data", (atMessage: AtMessage | null, unparsed: string) => {

  console.assert(unparsed === "");

  console.assert(expectUrc === JSON.stringify(atMessage, null, 2),
    `Fail test ${test}`);


  let first = true;

  emitter.on("data", (atMessage: AtMessage | null, unparsed: string) => {

    if (first) {

      console.assert(unparsed === "");

      console.assert(expect === JSON.stringify(atMessage, null, 2),
        `Fail test ${test}`);

      first = false;

    } else {

      console.assert(unparsed === "");

      console.assert(expectOk === JSON.stringify(atMessage, null, 2),
        `Fail test ${test}`);

      success = true;


    }


  });


});

let parser = getSerialPortParser();

process.nextTick(() => parser(emitter, Buffer.from(p1, "utf8")));
setTimeout(() => parser(emitter, Buffer.from(p2, "utf8")), 200);

setTimeout(() => {

  console.assert(success);

  console.log(`Pass test ${test}`.green);


}, 200);


expectOk= String.raw
`{
  "raw": "\r\nOK\r\n",
  "id": "OK",
  "isFinal": true
}`;

expect = String.raw
 `{
  "raw": "\r\n+CMGL:0,1,,21\r\n07913306091040F0040B913336766883F5000071205281500040024B32\r\n+CMGL:1,1,,40\r\n07913306091040F0040B913336766883F500007120528150104017CFF7FB0D0A83C2207618E42697E5F772580E229701\r\n+CMGL:2,1,,39\r\n07913306091040F0040B913336766883F50000712052815030401646B319140691CBA0F9BB3E2FCCE9E97619442E03\r\n+CMGL:3,1,,26\r\n07913306091040F0040B913336766883F500007120528150504007CCF29A4C5E9B01\r\n+CMGL:4,1,,37\r\n07913306091040F0040B913336766883F500007120528150604014CA32A85D0691D3F3709A0E2297416AF29A0C\r\n+CMGL:5,1,,28\r\n07913306091040F0040B913336766883F50000712052815080400A4CF29A6C5E9BD52733\r\n+CMGL:6,1,,27\r\n07913306091040F0040B913336766883F50000712052815090400946B319A42E83DA65\r\n+CMGL:7,1,,31\r\n07913306091040F0040B913336766883F50000712052815011400D46B319442E83E06433885C06\r\n+CMGL:8,1,,30\r\n07913306091040F0040B913336766883F50000712052815021400CCFF7FB0D0A83D46550BB0C\r\n+CMGL:9,1,,39\r\n07913306091040F0040B913336766883F50000712052815041401646B319A42E83ECE1F41CF40741C3F2F41C547703\r\n+CMGL:10,1,,45\r\n07913306091040F0040B913336766883F50000712052815061401DF0721D946EC3DF727A19C42ECF41E7B27B0E9ABFDD74909E5C06\r\n+CMGL:11,1,,38\r\n07913306091040F0040B913336766883F500007120528150714015CFF7FB0D5297416150FBEDA6C3CB6C76BA2C07\r\n+CMGL:12,1,,39\r\n07913306091040F0040B913336766883F50000712052815091401646B319F47CBFDF207219347FD7E785393DDD2E03\r\n+CMGL:13,1,,26\r\n07913306091040F0040B913336766883F500007120528150024008CFF7FB0D0A83C2\r\n+CMGL:14,1,,21\r\n07913306091040F0040B913336766883F500007120528150124002CA32\r\n+CMGL:15,1,,26\r\n07913306091040F0040B913336766883F500007120528150424007CFF7FB0D529701\r\n+CMGL:16,1,,159\r\n07913306091040F0440B913336766883F50008712052814130408C050003A70201004A006500200073007500690073002000E00020006C00610020007400EA0074006500200064007500200063006C0061007300730065006D0065006E00740020006700E9006E00E900720061006C0020006400650073002000670065006E007300200064006500200073006F0075007300E9007300740069006D006500200064006500200033\r\n+CMGL:17,1,,55\r\n07913306091040F0440B913336766883F500087120528141404024050003A702020067002000650074002000630072006F0069007200E00020007000610073\r\n+CMGL:18,1,,159\r\n07913306091040F0440B913336766883F50008712052818135408C050003A80201004A006500200073007500690073002000E00020006C00610020007400EA0074006500200064007500200063006C0061007300730065006D0065006E00740020006700E9006E00E900720061006C0020006400650073002000670065006E007300200064006500200073006F0075007300E9007300740069006D006500200064006500200033\r\n+CMGL:19,1,,55\r\n07913306091040F0440B913336766883F500087120528181454024050003A802020067002000650074002000630072006F0069007200E00020007000610073\r\n+CMGL:20,1,,159\r\n07913306091040F0440B913336766883F50008712052810282408C050003B50201004A006500200073007500690073002000E00020006C00610020007400EA0074006500200064007500200063006C0061007300730065006D0065006E00740020006700E9006E00E900720061006C0020006400650073002000670065006E007300200064006500200073006F0075007300E9007300740069006D006500200064006500200033\r\n+CMGL:21,1,,55\r\n07913306091040F0440B913336766883F500087120528102924024050003B502020067002000650074002000630072006F0069007200E00020007000610073\r\n",
  "id": "LIST",
  "atMessages": [
    {
      "raw": "\r\n+CMGL:0,1,,21\r\n07913306091040F0040B913336766883F5000071205281500040024B32",
      "id": "P_CMGL_SET",
      "index": 0,
      "stat": 1,
      "length": 21,
      "pdu": "07913306091040F0040B913336766883F5000071205281500040024B32",
      "statName": "REC_READ"
    },
    {
      "raw": "\r\n+CMGL:1,1,,40\r\n07913306091040F0040B913336766883F500007120528150104017CFF7FB0D0A83C2207618E42697E5F772580E229701",
      "id": "P_CMGL_SET",
      "index": 1,
      "stat": 1,
      "length": 40,
      "pdu": "07913306091040F0040B913336766883F500007120528150104017CFF7FB0D0A83C2207618E42697E5F772580E229701",
      "statName": "REC_READ"
    },
    {
      "raw": "\r\n+CMGL:2,1,,39\r\n07913306091040F0040B913336766883F50000712052815030401646B319140691CBA0F9BB3E2FCCE9E97619442E03",
      "id": "P_CMGL_SET",
      "index": 2,
      "stat": 1,
      "length": 39,
      "pdu": "07913306091040F0040B913336766883F50000712052815030401646B319140691CBA0F9BB3E2FCCE9E97619442E03",
      "statName": "REC_READ"
    },
    {
      "raw": "\r\n+CMGL:3,1,,26\r\n07913306091040F0040B913336766883F500007120528150504007CCF29A4C5E9B01",
      "id": "P_CMGL_SET",
      "index": 3,
      "stat": 1,
      "length": 26,
      "pdu": "07913306091040F0040B913336766883F500007120528150504007CCF29A4C5E9B01",
      "statName": "REC_READ"
    },
    {
      "raw": "\r\n+CMGL:4,1,,37\r\n07913306091040F0040B913336766883F500007120528150604014CA32A85D0691D3F3709A0E2297416AF29A0C",
      "id": "P_CMGL_SET",
      "index": 4,
      "stat": 1,
      "length": 37,
      "pdu": "07913306091040F0040B913336766883F500007120528150604014CA32A85D0691D3F3709A0E2297416AF29A0C",
      "statName": "REC_READ"
    },
    {
      "raw": "\r\n+CMGL:5,1,,28\r\n07913306091040F0040B913336766883F50000712052815080400A4CF29A6C5E9BD52733",
      "id": "P_CMGL_SET",
      "index": 5,
      "stat": 1,
      "length": 28,
      "pdu": "07913306091040F0040B913336766883F50000712052815080400A4CF29A6C5E9BD52733",
      "statName": "REC_READ"
    },
    {
      "raw": "\r\n+CMGL:6,1,,27\r\n07913306091040F0040B913336766883F50000712052815090400946B319A42E83DA65",
      "id": "P_CMGL_SET",
      "index": 6,
      "stat": 1,
      "length": 27,
      "pdu": "07913306091040F0040B913336766883F50000712052815090400946B319A42E83DA65",
      "statName": "REC_READ"
    },
    {
      "raw": "\r\n+CMGL:7,1,,31\r\n07913306091040F0040B913336766883F50000712052815011400D46B319442E83E06433885C06",
      "id": "P_CMGL_SET",
      "index": 7,
      "stat": 1,
      "length": 31,
      "pdu": "07913306091040F0040B913336766883F50000712052815011400D46B319442E83E06433885C06",
      "statName": "REC_READ"
    },
    {
      "raw": "\r\n+CMGL:8,1,,30\r\n07913306091040F0040B913336766883F50000712052815021400CCFF7FB0D0A83D46550BB0C",
      "id": "P_CMGL_SET",
      "index": 8,
      "stat": 1,
      "length": 30,
      "pdu": "07913306091040F0040B913336766883F50000712052815021400CCFF7FB0D0A83D46550BB0C",
      "statName": "REC_READ"
    },
    {
      "raw": "\r\n+CMGL:9,1,,39\r\n07913306091040F0040B913336766883F50000712052815041401646B319A42E83ECE1F41CF40741C3F2F41C547703",
      "id": "P_CMGL_SET",
      "index": 9,
      "stat": 1,
      "length": 39,
      "pdu": "07913306091040F0040B913336766883F50000712052815041401646B319A42E83ECE1F41CF40741C3F2F41C547703",
      "statName": "REC_READ"
    },
    {
      "raw": "\r\n+CMGL:10,1,,45\r\n07913306091040F0040B913336766883F50000712052815061401DF0721D946EC3DF727A19C42ECF41E7B27B0E9ABFDD74909E5C06",
      "id": "P_CMGL_SET",
      "index": 10,
      "stat": 1,
      "length": 45,
      "pdu": "07913306091040F0040B913336766883F50000712052815061401DF0721D946EC3DF727A19C42ECF41E7B27B0E9ABFDD74909E5C06",
      "statName": "REC_READ"
    },
    {
      "raw": "\r\n+CMGL:11,1,,38\r\n07913306091040F0040B913336766883F500007120528150714015CFF7FB0D5297416150FBEDA6C3CB6C76BA2C07",
      "id": "P_CMGL_SET",
      "index": 11,
      "stat": 1,
      "length": 38,
      "pdu": "07913306091040F0040B913336766883F500007120528150714015CFF7FB0D5297416150FBEDA6C3CB6C76BA2C07",
      "statName": "REC_READ"
    },
    {
      "raw": "\r\n+CMGL:12,1,,39\r\n07913306091040F0040B913336766883F50000712052815091401646B319F47CBFDF207219347FD7E785393DDD2E03",
      "id": "P_CMGL_SET",
      "index": 12,
      "stat": 1,
      "length": 39,
      "pdu": "07913306091040F0040B913336766883F50000712052815091401646B319F47CBFDF207219347FD7E785393DDD2E03",
      "statName": "REC_READ"
    },
    {
      "raw": "\r\n+CMGL:13,1,,26\r\n07913306091040F0040B913336766883F500007120528150024008CFF7FB0D0A83C2",
      "id": "P_CMGL_SET",
      "index": 13,
      "stat": 1,
      "length": 26,
      "pdu": "07913306091040F0040B913336766883F500007120528150024008CFF7FB0D0A83C2",
      "statName": "REC_READ"
    },
    {
      "raw": "\r\n+CMGL:14,1,,21\r\n07913306091040F0040B913336766883F500007120528150124002CA32",
      "id": "P_CMGL_SET",
      "index": 14,
      "stat": 1,
      "length": 21,
      "pdu": "07913306091040F0040B913336766883F500007120528150124002CA32",
      "statName": "REC_READ"
    },
    {
      "raw": "\r\n+CMGL:15,1,,26\r\n07913306091040F0040B913336766883F500007120528150424007CFF7FB0D529701",
      "id": "P_CMGL_SET",
      "index": 15,
      "stat": 1,
      "length": 26,
      "pdu": "07913306091040F0040B913336766883F500007120528150424007CFF7FB0D529701",
      "statName": "REC_READ"
    },
    {
      "raw": "\r\n+CMGL:16,1,,159\r\n07913306091040F0440B913336766883F50008712052814130408C050003A70201004A006500200073007500690073002000E00020006C00610020007400EA0074006500200064007500200063006C0061007300730065006D0065006E00740020006700E9006E00E900720061006C0020006400650073002000670065006E007300200064006500200073006F0075007300E9007300740069006D006500200064006500200033",
      "id": "P_CMGL_SET",
      "index": 16,
      "stat": 1,
      "length": 159,
      "pdu": "07913306091040F0440B913336766883F50008712052814130408C050003A70201004A006500200073007500690073002000E00020006C00610020007400EA0074006500200064007500200063006C0061007300730065006D0065006E00740020006700E9006E00E900720061006C0020006400650073002000670065006E007300200064006500200073006F0075007300E9007300740069006D006500200064006500200033",
      "statName": "REC_READ"
    },
    {
      "raw": "\r\n+CMGL:17,1,,55\r\n07913306091040F0440B913336766883F500087120528141404024050003A702020067002000650074002000630072006F0069007200E00020007000610073",
      "id": "P_CMGL_SET",
      "index": 17,
      "stat": 1,
      "length": 55,
      "pdu": "07913306091040F0440B913336766883F500087120528141404024050003A702020067002000650074002000630072006F0069007200E00020007000610073",
      "statName": "REC_READ"
    },
    {
      "raw": "\r\n+CMGL:18,1,,159\r\n07913306091040F0440B913336766883F50008712052818135408C050003A80201004A006500200073007500690073002000E00020006C00610020007400EA0074006500200064007500200063006C0061007300730065006D0065006E00740020006700E9006E00E900720061006C0020006400650073002000670065006E007300200064006500200073006F0075007300E9007300740069006D006500200064006500200033",
      "id": "P_CMGL_SET",
      "index": 18,
      "stat": 1,
      "length": 159,
      "pdu": "07913306091040F0440B913336766883F50008712052818135408C050003A80201004A006500200073007500690073002000E00020006C00610020007400EA0074006500200064007500200063006C0061007300730065006D0065006E00740020006700E9006E00E900720061006C0020006400650073002000670065006E007300200064006500200073006F0075007300E9007300740069006D006500200064006500200033",
      "statName": "REC_READ"
    },
    {
      "raw": "\r\n+CMGL:19,1,,55\r\n07913306091040F0440B913336766883F500087120528181454024050003A802020067002000650074002000630072006F0069007200E00020007000610073",
      "id": "P_CMGL_SET",
      "index": 19,
      "stat": 1,
      "length": 55,
      "pdu": "07913306091040F0440B913336766883F500087120528181454024050003A802020067002000650074002000630072006F0069007200E00020007000610073",
      "statName": "REC_READ"
    },
    {
      "raw": "\r\n+CMGL:20,1,,159\r\n07913306091040F0440B913336766883F50008712052810282408C050003B50201004A006500200073007500690073002000E00020006C00610020007400EA0074006500200064007500200063006C0061007300730065006D0065006E00740020006700E9006E00E900720061006C0020006400650073002000670065006E007300200064006500200073006F0075007300E9007300740069006D006500200064006500200033",
      "id": "P_CMGL_SET",
      "index": 20,
      "stat": 1,
      "length": 159,
      "pdu": "07913306091040F0440B913336766883F50008712052810282408C050003B50201004A006500200073007500690073002000E00020006C00610020007400EA0074006500200064007500200063006C0061007300730065006D0065006E00740020006700E9006E00E900720061006C0020006400650073002000670065006E007300200064006500200073006F0075007300E9007300740069006D006500200064006500200033",
      "statName": "REC_READ"
    },
    {
      "raw": "\r\n+CMGL:21,1,,55\r\n07913306091040F0440B913336766883F500087120528102924024050003B502020067002000650074002000630072006F0069007200E00020007000610073",
      "id": "P_CMGL_SET",
      "index": 21,
      "stat": 1,
      "length": 55,
      "pdu": "07913306091040F0440B913336766883F500087120528102924024050003B502020067002000650074002000630072006F0069007200E00020007000610073",
      "statName": "REC_READ"
    }
  ]
}`;

expectUrc= String.raw
`{
  "raw": "\r\n^BOOT:37478870,0,0,0,77\r\n",
  "id": "CX_BOOT_URC",
  "isUnsolicited": true
}`;