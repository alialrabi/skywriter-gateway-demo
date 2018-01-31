import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Reportjob } from './reportjob.model';
import { ReportjobPopupService } from './reportjob-popup.service';
import { ReportjobService } from './reportjob.service';
import { Reportouput, ReportouputService } from '../reportouput';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-reportjob-dialog',
    templateUrl: './reportjob-dialog.component.html'
})
export class ReportjobDialogComponent implements OnInit {

    reportjob: Reportjob;
    isSaving: boolean;

    reportouputs: Reportouput[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private reportjobService: ReportjobService,
        private reportouputService: ReportouputService,
        private eventManager: JhiEventManager
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
