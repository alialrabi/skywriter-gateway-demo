import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Reportparameter } from './reportparameter.model';
import { ReportparameterService } from './reportparameter.service';

@Injectable()
export class ReportparameterPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private reportparameterService: ReportparameterService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.reportparameterService.find(id).subscribe((reportparameter) => {
                    reportparameter.lastmodifieddatetime = this.datePipe
                        .transform(reportparameter.lastmodifieddatetime, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.reportparameterModalRef(component, reportparameter);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.reportparameterModalRef(component, new Reportparameter());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    reportparameterModalRef(component: Component, reportparameter: Reportparameter): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.reportparameter = reportparameter;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
