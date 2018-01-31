import { BaseEntity } from './../../shared';

export class Reportjob implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public status?: string,
        public lastmodiefiedby?: string,
        public lastmodiefieddatetime?: any,
        public domain?: string,
        public reportouputId?: number,
    ) {
    }
}
