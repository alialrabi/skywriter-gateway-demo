import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Reportouput } from './reportouput.model';
import { ReportouputService } from './reportouput.service';

@Component({
    selector: 'jhi-reportouput-detail',
    templateUrl: './reportouput-detail.component.html'
})
export class ReportouputDetailComponent implements OnInit, OnDestroy {

    reportouput: Reportouput;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private reportouputService: ReportouputService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInReportouputs();
    }

    load(id) {
        this.reportouputService.find(id).subscribe((reportouput) => {
            this.reportouput = reportouput;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInReportouputs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'reportouputListModification',
            (response) => this.load(this.reportouput.id)
        );
    }
}
