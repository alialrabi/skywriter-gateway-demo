import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Reportparameter } from './reportparameter.model';
import { ReportparameterPopupService } from './reportparameter-popup.service';
import { ReportparameterService } from './reportparameter.service';

@Component({
    selector: 'jhi-reportparameter-delete-dialog',
    templateUrl: './reportparameter-delete-dialog.component.html'
})
export class ReportparameterDeleteDialogComponent {

    reportparameter: Reportparameter;

    constructor(
        private reportparameterService: ReportparameterService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.reportparameterService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'reportparameterListModification',
                content: 'Deleted an reportparameter'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-reportparameter-delete-popup',
    template: ''
})
export class ReportparameterDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reportparameterPopupService: ReportparameterPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.reportparameterPopupService
                .open(ReportparameterDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
