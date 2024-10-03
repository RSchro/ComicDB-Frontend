import { Publisher } from "./publisher";

export class Comic {

    constructor(public id: string,
                public upc: string,
                public title: string,
                public publisher: string,
                public issue: number,
                public printingNum: number,
                public imageUrl: string,
                public dateCreated: Date
    ) {}
}
