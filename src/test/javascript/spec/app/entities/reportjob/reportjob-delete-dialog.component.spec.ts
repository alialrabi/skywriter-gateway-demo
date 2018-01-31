/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ReportgatewayTestModule } from '../../../test.module';
import { ReportjobDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/reportjob/reportjob-delete-dialog.component';
import { ReportjobService } from '../../../../../../main/webapp/app/entities/reportjob/reportjob.service';

describe('Component Tests', () => {

    describe('Reportjob Management Delete Component', () => {
        let comp: ReportjobDeleteDialogComponent;
        let fixture: ComponentFixture<ReportjobDeleteDialogComponent>;
        let service: ReportjobService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReportgatewayTestModule],
                declarations: [ReportjobDeleteDialogComponent],
                providers: [
                    ReportjobService
                ]
            })
            .overrideTemplate(ReportjobDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReportjobDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReportjobService);
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
