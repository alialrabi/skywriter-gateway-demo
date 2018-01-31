/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ReportgatewayTestModule } from '../../../test.module';
import { BucketDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/bucket/bucket-delete-dialog.component';
import { BucketService } from '../../../../../../main/webapp/app/entities/bucket/bucket.service';

describe('Component Tests', () => {

    describe('Bucket Management Delete Component', () => {
        let comp: BucketDeleteDialogComponent;
        let fixture: ComponentFixture<BucketDeleteDialogComponent>;
        let service: BucketService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReportgatewayTestModule],
                declarations: [BucketDeleteDialogComponent],
                providers: [
                    BucketService
                ]
            })
            .overrideTemplate(BucketDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BucketDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BucketService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
