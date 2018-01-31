import { BaseEntity } from './../../shared';

export class Reportouput implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public reporttemplatename?: string,
        public reportoutputtypecode?: string,
        public status?: string,
        public lastmodifiedby?: string,
        public lastmodifieddatetime?: any,
        public domain?: string,
        public reportfileContentType?: string,
        public reportfile?: any,
        public reportjobId?: number,
    ) {
    }
}
