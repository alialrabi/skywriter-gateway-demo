import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReportgatewaySharedModule } from '../../shared';
import {
    BucketService,
    BucketPopupService,
    BucketComponent,
    BucketDetailComponent,
    BucketDialogComponent,
    BucketPopupComponent,
    BucketDeletePopupComponent,
    BucketDeleteDialogComponent,
    bucketRoute,
    bucketPopupRoute,
    BucketResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...bucketRoute,
    ...bucketPopupRoute,
];

@NgModule({
    imports: [
        ReportgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BucketComponent,
        BucketDetailComponent,
        BucketDialogComponent,
        BucketDeleteDialogComponent,
        BucketPopupComponent,
        BucketDeletePopupComponent,
    ],
    entryComponents: [
        BucketComponent,
        BucketDialogComponent,
        BucketPopupComponent,
        BucketDeleteDialogComponent,
        BucketDeletePopupComponent,
    ],
    providers: [
        BucketService,
        BucketPopupService,
        BucketResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportgatewayBucketModule {}
