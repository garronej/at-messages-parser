/// <reference types="node" />
import { AtMessage } from "./AtMessage";
import { Evt } from "evt";
export declare function getSerialPortParser(delayBeforeFlush?: number): ((emitter: NodeJS.EventEmitter, buffer: Buffer) => void) & {
    flush: () => string;
    evtRawData: Evt<string>;
};
export declare class AtMessagesParserError extends Error {
    readonly rawAtMessages: string;
    readonly originalError: Error;
    readonly urcMessages: AtMessage[];
    readonly leftToParse: string;
    constructor(rawAtMessages: string, originalError: Error, urcMessages: AtMessage[], leftToParse: string);
}
export declare function atMessagesParser(rawAtMessages: string): AtMessage[];
