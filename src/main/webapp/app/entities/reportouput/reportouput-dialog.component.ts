import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Reportouput } from './reportouput.model';
import { ReportouputPopupService } from './reportouput-popup.service';
import { ReportouputService } from './reportouput.service';
import { Reportjob, ReportjobService } from '../reportjob';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-reportouput-dialog',
    templateUrl: './reportouput-dialog.component.html'
})
export class ReportouputDialogComponent implements OnInit {

    reportouput: Reportouput;
    isSaving: boolean;

    reportjobs: Reportjob[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private reportouputService: ReportouputService,
        private reportjobService: ReportjobService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.reportjobService.query()
            .subscribe((res: ResponseWrapper) => { this.reportjobs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
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
        this.isSaving = true;
        if (this.reportouput.id !== undefined) {
            this.subscribeToSaveResponse(
                this.reportouputService.update(this.reportouput));
        } else {
            this.subscribeToSaveResponse(
                this.reportouputService.create(this.reportouput));
        }
    }

    private subscribeToSaveResponse(result: Observable<Reportouput>) {
        result.subscribe((res: Reportouput) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Reportouput) {
        this.eventManager.broadcast({ name: 'reportouputListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackReportjobById(index: number, item: Reportjob) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-reportouput-popup',
    template: ''
})
export class ReportouputPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reportouputPopupService: ReportouputPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.reportouputPopupService
                    .open(ReportouputDialogComponent as Component, params['id']);
            } else {
                this.reportouputPopupService
                    .open(ReportouputDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
