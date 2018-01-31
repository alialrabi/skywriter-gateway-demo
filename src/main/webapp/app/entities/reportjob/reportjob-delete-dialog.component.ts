import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Reportjob } from './reportjob.model';
import { ReportjobPopupService } from './reportjob-popup.service';
import { ReportjobService } from './reportjob.service';

@Component({
    selector: 'jhi-reportjob-delete-dialog',
    templateUrl: './reportjob-delete-dialog.component.html'
})
export class ReportjobDeleteDialogComponent {

    reportjob: Reportjob;

    constructor(
        private reportjobService: ReportjobService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.reportjobService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'reportjobListModification',
                content: 'Deleted an reportjob'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-reportjob-delete-popup',
    template: ''
})
export class ReportjobDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reportjobPopupService: ReportjobPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.reportjobPopupService
                .open(ReportjobDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
