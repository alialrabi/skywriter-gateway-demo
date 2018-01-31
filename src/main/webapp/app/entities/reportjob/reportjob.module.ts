import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReportgatewaySharedModule } from '../../shared';
import {
    ReportjobService,
    ReportjobPopupService,
    ReportjobComponent,
    ReportjobDetailComponent,
    ReportjobDialogComponent,
    ReportjobPopupComponent,
    ReportjobDeletePopupComponent,
    ReportjobDeleteDialogComponent,
    reportjobRoute,
    reportjobPopupRoute,
    ReportjobResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...reportjobRoute,
    ...reportjobPopupRoute,
];

@NgModule({
    imports: [
        ReportgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ReportjobComponent,
        ReportjobDetailComponent,
        ReportjobDialogComponent,
        ReportjobDeleteDialogComponent,
        ReportjobPopupComponent,
        ReportjobDeletePopupComponent,
    ],
    entryComponents: [
        ReportjobComponent,
        ReportjobDialogComponent,
        ReportjobPopupComponent,
        ReportjobDeleteDialogComponent,
        ReportjobDeletePopupComponent,
    ],
    providers: [
        ReportjobService,
        ReportjobPopupService,
        ReportjobResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportgatewayReportjobModule {}
