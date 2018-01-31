import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Bucket } from './bucket.model';
import { BucketPopupService } from './bucket-popup.service';
import { BucketService } from './bucket.service';

@Component({
    selector: 'jhi-bucket-dialog',
    templateUrl: './bucket-dialog.component.html'
})
export class BucketDialogComponent implements OnInit {

    bucket: Bucket;
    isSaving: boolean;
    admin: boolean=false;
    user: boolean=false;
    
    constructor(
        public activeModal: NgbActiveModal,
        private bucketService: BucketService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bucket.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bucketService.update(this.bucket));
        } else {
            this.subscribeToSaveResponse(
                this.bucketService.create(this.bucket));
        }
    }

    private subscribeToSaveResponse(result: Observable<Bucket>) {
        result.subscribe((res: Bucket) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Bucket) {
        this.eventManager.broadcast({ name: 'bucketListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
    
    setRole(){
      if(this.admin === false && this.user === true){
        this.bucket.accesscontrol="user";
      }
      if(this.admin === true && this.user === false){
        this.bucket.accesscontrol="admin";
      }
      if(this.admin === true && this.user === true){
        this.bucket.accesscontrol="admin&user";
      }
      if(this.admin === false && this.user === false){
        this.bucket.accesscontrol="";
      }
          
    }
}

@Component({
    selector: 'jhi-bucket-popup',
    template: ''
})
export class BucketPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bucketPopupService: BucketPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bucketPopupService
                    .open(BucketDialogComponent as Component, params['id']);
            } else {
                this.bucketPopupService
                    .open(BucketDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
