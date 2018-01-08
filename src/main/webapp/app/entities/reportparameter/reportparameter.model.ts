import { BaseEntity } from './../../shared';

export class Reportparameter implements BaseEntity {
    constructor(
        public id?: number,
        public label?: string,
        public instructions?: string,
        public datatype?: string,
        public required?: string,
        public minlength?: string,
        public maxlength?: string,
        public validation?: string,
        public status?: string,
        public lastmodifiedby?: string,
        public lastmodifieddatetime?: any,
        public domain?: string,
        public reportId?: number,
    ) {
    }
}
