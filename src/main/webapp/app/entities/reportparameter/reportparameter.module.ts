import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReportgatewaySharedModule } from '../../shared';
import {
    ReportparameterService,
    ReportparameterPopupService,
    ReportparameterComponent,
    ReportparameterDetailComponent,
    ReportparameterDialogComponent,
    ReportparameterPopupComponent,
    ReportparameterDeletePopupComponent,
    ReportparameterDeleteDialogComponent,
    reportparameterRoute,
    reportparameterPopupRoute,
    ReportparameterResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...reportparameterRoute,
    ...reportparameterPopupRoute,
];

@NgModule({
    imports: [
        ReportgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ReportparameterComponent,
        ReportparameterDetailComponent,
        ReportparameterDialogComponent,
        ReportparameterDeleteDialogComponent,
        ReportparameterPopupComponent,
        ReportparameterDeletePopupComponent,
    ],
    entryComponents: [
        ReportparameterComponent,
        ReportparameterDialogComponent,
        ReportparameterPopupComponent,
        ReportparameterDeleteDialogComponent,
        ReportparameterDeletePopupComponent,
    ],
    providers: [
        ReportparameterService,
        ReportparameterPopupService,
        ReportparameterResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportgatewayReportparameterModule {}
