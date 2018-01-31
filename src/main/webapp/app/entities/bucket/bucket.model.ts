import { BaseEntity } from './../../shared';

export class Bucket implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public folderpath?: string,
        public accesscontrol?: string,
        public reports?: BaseEntity[],
    ) {
    }
}
