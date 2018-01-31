import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReportgatewaySharedModule } from '../../shared';
import {
    ReportouputService,
    ReportouputPopupService,
    ReportouputComponent,
    ReportouputDetailComponent,
    ReportouputDialogComponent,
    ReportouputPopupComponent,
    ReportouputDeletePopupComponent,
    ReportouputDeleteDialogComponent,
    reportouputRoute,
    reportouputPopupRoute,
    ReportouputResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...reportouputRoute,
    ...reportouputPopupRoute,
];

@NgModule({
    imports: [
        ReportgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ReportouputComponent,
        ReportouputDetailComponent,
        ReportouputDialogComponent,
        ReportouputDeleteDialogComponent,
        ReportouputPopupComponent,
        ReportouputDeletePopupComponent,
    ],
    entryComponents: [
        ReportouputComponent,
        ReportouputDialogComponent,
        ReportouputPopupComponent,
        ReportouputDeleteDialogComponent,
        ReportouputDeletePopupComponent,
    ],
    providers: [
        ReportouputService,
        ReportouputPopupService,
        ReportouputResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportgatewayReportouputModule {}
