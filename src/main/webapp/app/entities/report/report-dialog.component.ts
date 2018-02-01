import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Report } from './report.model';
import { ReportPopupService } from './report-popup.service';
import { ReportService } from './report.service';
import { Bucket, BucketService } from '../bucket';
import { ResponseWrapper } from '../../shared';

import { Account, LoginModalService, Principal } from '../../shared';

@Component({
    selector: 'jhi-report-dialog',
    templateUrl: './report-dialog.component.html'
})
export class ReportDialogComponent implements OnInit {

    report: Report;
    isSaving: boolean;
	account: Account;
    buckets: Bucket[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private reportService: ReportService,
        private bucketService: BucketService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    ngOnInit() {
    	
    	this.principal.identity().then((account) => {
    	 this.account = account ;
    	});
    
        this.isSaving = false;
        this.bucketService.query()
            .subscribe((res: ResponseWrapper) => { this.buckets = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        console.log(this.report);
         console.log(this.report.bucket);
        this.isSaving = true;
        if (this.report.id !== undefined) {
            this.subscribeToSaveResponse(
                this.reportService.update(this.report));
        } else {
        	this.report.lastmodifiedby = this.account.login ;
            this.subscribeToSaveResponse(
                this.reportService.create(this.report));
        }
    }

    private subscribeToSaveResponse(result: Observable<Report>) {
        result.subscribe((res: Report) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Report) {
        this.eventManager.broadcast({ name: 'reportListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBucketById(index: number, item: Bucket) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-report-popup',
    template: ''
})
export class ReportPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reportPopupService: ReportPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.reportPopupService
                    .open(ReportDialogComponent as Component, params['id']);
            } else {
                this.reportPopupService
                    .open(ReportDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}