require("colors");

import {
        getSerialPortParser,
        AtMessage
} from "../lib/index";
import { EventEmitter } from "events";
import { readFileSync } from "fs";

let atMessages: AtMessage[];
let expect: string;
let test: string;

test = "test serial parser flush";

let rawAtMessages = readFileSync(
  __dirname + "/../../res/longInput2.txt",
  { "encoding": "utf8" }
);

let [p1,p2]= rawAtMessages.split("\n***\n");

p1= p1.replace(/\\n/g, "\n");
p1= p1.replace(/\\r/g, "\r");
p1= p1.replace(/\\"/g, '"');


let expectUnparsed = String.raw
`"\r\n+CMGL:0,1,,21\r\n07913306091040F0040B913336766883F5000071205281500040024B32\r\n+CMGL:1,1,,40\r\n07913306091040F0040B913336766883F500007120528150104017CFF7FB0D0A83C2207618E42697E5F772580E229701\r\n+CMGL:2,1,,39\r\n07913306091040F0040B913336766883F50000712052815030401646B319140691CBA0F9BB3E2FCCE9E97619442E03\r\n+CMGL:3,1,,26\r\n07913306091040F0040B913336766883F500007120528150504007CCF29A4C5E9B01\r\n+CMGL:4,1,,37\r\n07913306091040F0040B913336766883F500007120528150604014CA32A85D0691D3F3709A0E2297416AF29A0C\r\n+CMGL:5,1,,28\r\n07913306091040F0040B913336766883F50000712052815080400A4CF29A6C5E9BD52733\r\n+CMGL:6,1,,27\r\n07913306091040F0040B913336766883F50000712052815090400946B319A4"`;

expect = String.raw
  `{
  "raw": "\r\n^BOOT:37478870,0,0,0,77\r\n",
  "id": "CX_BOOT_URC",
  "isUnsolicited": true
}`;


let emitter = new EventEmitter();

let success = false;

emitter.once("data", (atMessage: AtMessage | null, unparsed: string) => {

  console.assert(unparsed === "");

  console.assert(expect === JSON.stringify(atMessage, null, 2),
    `Fail test ${test}`.red);


});

let parser = getSerialPortParser();

parser(emitter, new Buffer(p1, "utf8"));

setTimeout(()=>{

  let unparsed= parser.flush();

  console.assert(expectUnparsed === JSON.stringify(unparsed),
      `Fail test ${test}`.red);

  console.log(`Pass test ${test}`.green);


},200);


