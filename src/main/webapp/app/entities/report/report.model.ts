import { BaseEntity } from './../../shared';

export const enum Reportclass {
    'online',
    'schedule'
}

export class Report implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public reporttemplatename?: string,
        public reportoutputtypecode?: string,
        public status?: string,
        public lastmodifiedby?: string,
        public bucket?: string,
        public lastmodifieddatetime?: any,
        public domain?: string,
        public reportfileContentType?: string,
        public reportfile?: any,
        public jrxmlfileContentType?: string,
        public jrxmlfile?: any,
        public reportclass?: Reportclass,
        public reportparameters?: BaseEntity[],
        public reportjobId?: number,
        public bucketId?: BaseEntity[],
    ) {
    }
}
