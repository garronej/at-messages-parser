import { MapExtended } from "trackable-map";

export class StringExtractor {

    private readonly map= new MapExtended<number, string>();

    constructor(public readonly source: string){

        for( let i=0; i<source.length; i++)
            this.map.set(i, source[i]);
        
    }

    public get state(): string {

        let out = "";

        for (let index of this.map.intKeysAsSortedArray())
            out += this.map.get(index);

        return out;

    }

    public extract(part: string): number {

        let mapIndexes = this.map.intKeysAsSortedArray();

        mapRun: for (let i = 0; i < mapIndexes.length; i++) {

            for (let j = 0; j < part.length; j++)
                if (this.map.get(mapIndexes[i + j]) !== part[j])
                    continue mapRun;


            for (let j = 0; j < part.length; j++)
                this.map.delete(mapIndexes[i + j]);

            return mapIndexes[i];

        }

        throw new Error(`StringExtractor error: ${JSON.stringify(part)} not found in ${JSON.stringify(this.state)}`);

    }

}
