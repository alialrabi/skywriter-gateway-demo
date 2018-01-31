import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ReportgatewayReportModule } from './report/report.module';
import { ReportgatewayReportparameterModule } from './reportparameter/reportparameter.module';
import { ReportgatewayBucketModule } from './bucket/bucket.module';
import { ReportgatewayReportjobModule } from './reportjob/reportjob.module';
import { ReportgatewayReportouputModule } from './reportouput/reportouput.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ReportgatewayReportModule,
        ReportgatewayReportparameterModule,
        ReportgatewayBucketModule,
        ReportgatewayReportjobModule,
        ReportgatewayReportouputModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportgatewayEntityModule {}
