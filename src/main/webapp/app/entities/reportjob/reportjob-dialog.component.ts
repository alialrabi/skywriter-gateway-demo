import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response, Http, ResponseContentType } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Reportjob } from './reportjob.model';
import { ReportjobPopupService } from './reportjob-popup.service';
import { ReportjobService } from './reportjob.service';
import { Reportouput, ReportouputService } from '../reportouput';
import { Report, ReportService } from '../report';
import { ResponseWrapper } from '../../shared';

import * as $ from "jquery";
import { saveAs } from 'file-saver';

@Component({
    selector: 'jhi-reportjob-dialog',
    templateUrl: './reportjob-dialog.component.html'
})
export class ReportjobDialogComponent implements OnInit {

    reportjob: Reportjob;
    isSaving: boolean;

    reportouputs: Reportouput[];

    reports: Report[];

    reportparameters: any;
    
    report: Report;
    
    parameters: any;
    
    closeResult: string;

    @ViewChild('parametermodal') el:ElementRef;
  
    reportId: number;


    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private reportjobService: ReportjobService,
        private reportouputService: ReportouputService,
        private reportService: ReportService,
        private eventManager: JhiEventManager,
        private  http: Http,
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.reportouputService
            .query({filter: 'reportjob-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.reportjob.reportouputId) {
                    this.reportouputs = res.json;
                } else {
                    this.reportouputService
                        .find(this.reportjob.reportouputId)
                        .subscribe((subRes: Reportouput) => {
                            this.reportouputs = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.reportService.query()
            .subscribe((res: ResponseWrapper) => { this.reports = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.reportjob.id !== undefined) {
            this.subscribeToSaveResponse(
                this.reportjobService.update(this.reportjob));
        } else {
            this.subscribeToSaveResponse(
                this.reportjobService.create(this.reportjob));
        }
    }

    private subscribeToSaveResponse(result: Observable<Reportjob>) {
        result.subscribe((res: Reportjob) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Reportjob) {
        this.eventManager.broadcast({ name: 'reportjobListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackReportouputById(index: number, item: Reportouput) {
        return item.id;
    }

    trackReportById(index: number, item: Report) {
        return item.id;
    }
  
    getparameters(id){
        console.log(id)
       this.reportId = id;
       this.reportService.reportparameters(id).subscribe((parameters: Response) => {
             this.reportparameters=parameters.json();
             console.log(parameters.json());
        });
    }
  
     testReport(){
           this.reportService.parameterList(this.reportId).subscribe((parameters: Response) => {

          if ( parameters.json().length <= 0 ){

            var jsonString = JSON.stringify(parameters.json());                        
                         let formData = new FormData();
        this.reportService.schedulereports(this.reportId,jsonString).subscribe((res: Response) => {
           console.log("Done");
        });
        }
        });
        }

}

@Component({
    selector: 'jhi-reportjob-popup',
    template: ''
})
export class ReportjobPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reportjobPopupService: ReportjobPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.reportjobPopupService
                    .open(ReportjobDialogComponent as Component, params['id']);
            } else {
                this.reportjobPopupService
                    .open(ReportjobDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
