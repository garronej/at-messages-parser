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

test = "test serial parser fix 1";


let emitter = new EventEmitter();

let success = false;

let n = 1;

let parser = getSerialPortParser(290);

emitter.on("data", (atMessage: AtMessage | null, unparsed: string) => {

  switch (n) {
    case 1:
      console.assert(unparsed === " *1*  *2*  *3* ");
      n++;
      break;
    case 2:
      console.assert(unparsed === " *4*  *5*  *6* ");
      n++;
      break;
    case 3:
      console.assert(unparsed === " *7*  *8*  *9* ");
      setTimeout(() => {
        console.assert(parser.flush() === " *10* ");
        console.log(`Pass test ${test}`.green);
      }, 90);
      break;
  }


});



(async () => {

  for (let i = 1; i <= 10; i++) {

    await new Promise(resolve => setTimeout(() => resolve(), 100));

    parser(emitter, new Buffer(` *${i}* `, "utf8"));

  }

})();
