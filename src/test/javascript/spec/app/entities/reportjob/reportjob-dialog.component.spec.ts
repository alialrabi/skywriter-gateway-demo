/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ReportgatewayTestModule } from '../../../test.module';
import { ReportjobDialogComponent } from '../../../../../../main/webapp/app/entities/reportjob/reportjob-dialog.component';
import { ReportjobService } from '../../../../../../main/webapp/app/entities/reportjob/reportjob.service';
import { Reportjob } from '../../../../../../main/webapp/app/entities/reportjob/reportjob.model';
import { ReportouputService } from '../../../../../../main/webapp/app/entities/reportouput';
import { ReportService } from '../../../../../../main/webapp/app/entities/report';

describe('Component Tests', () => {

    describe('Reportjob Management Dialog Component', () => {
        let comp: ReportjobDialogComponent;
        let fixture: ComponentFixture<ReportjobDialogComponent>;
        let service: ReportjobService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReportgatewayTestModule],
                declarations: [ReportjobDialogComponent],
                providers: [
                    ReportouputService,
                    ReportService,
                    ReportjobService
                ]
            })
            .overrideTemplate(ReportjobDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReportjobDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReportjobService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Reportjob(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.reportjob = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'reportjobListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Reportjob();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.reportjob = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'reportjobListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
