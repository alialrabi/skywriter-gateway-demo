import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Reportjob } from './reportjob.model';
import { ReportjobService } from './reportjob.service';

@Component({
    selector: 'jhi-reportjob-detail',
    templateUrl: './reportjob-detail.component.html'
})
export class ReportjobDetailComponent implements OnInit, OnDestroy {

    reportjob: Reportjob;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private reportjobService: ReportjobService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInReportjobs();
    }

    load(id) {
        this.reportjobService.find(id).subscribe((reportjob) => {
            this.reportjob = reportjob;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInReportjobs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'reportjobListModification',
            (response) => this.load(this.reportjob.id)
        );
    }
}
