export declare class StringExtractor {
    readonly source: string;
    private readonly map;
    constructor(source: string);
    readonly state: string;
    extract(part: string): number;
}
