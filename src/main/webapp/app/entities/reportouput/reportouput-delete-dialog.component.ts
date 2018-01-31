import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Reportouput } from './reportouput.model';
import { ReportouputPopupService } from './reportouput-popup.service';
import { ReportouputService } from './reportouput.service';

@Component({
    selector: 'jhi-reportouput-delete-dialog',
    templateUrl: './reportouput-delete-dialog.component.html'
})
export class ReportouputDeleteDialogComponent {

    reportouput: Reportouput;

    constructor(
        private reportouputService: ReportouputService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.reportouputService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'reportouputListModification',
                content: 'Deleted an reportouput'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-reportouput-delete-popup',
    template: ''
})
export class ReportouputDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reportouputPopupService: ReportouputPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.reportouputPopupService
                .open(ReportouputDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
