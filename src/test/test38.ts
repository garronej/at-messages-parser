require("colors");

import { StringExtractor } from "../lib/StringExtractor";

//Test

let stringExtractor= new StringExtractor("aaabbbccc");

console.assert(stringExtractor.extract("bbb") === 3);

console.assert(stringExtractor.state === "aaaccc" );

console.assert(stringExtractor.extract("c") === 6 );

try{

    stringExtractor.extract("aacccc");

}catch(error){

    console.assert(error.message === 'StringExtractor error: "aacccc" not found in "aaacc"');

}

console.assert(stringExtractor.state === "aaacc" );

console.assert(stringExtractor.extract("aaacc") === 0 );

console.assert(stringExtractor.state === "" );
