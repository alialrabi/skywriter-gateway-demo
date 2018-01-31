/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ReportgatewayTestModule } from '../../../test.module';
import { ReportouputDialogComponent } from '../../../../../../main/webapp/app/entities/reportouput/reportouput-dialog.component';
import { ReportouputService } from '../../../../../../main/webapp/app/entities/reportouput/reportouput.service';
import { Reportouput } from '../../../../../../main/webapp/app/entities/reportouput/reportouput.model';
import { ReportjobService } from '../../../../../../main/webapp/app/entities/reportjob';

describe('Component Tests', () => {

    describe('Reportouput Management Dialog Component', () => {
        let comp: ReportouputDialogComponent;
        let fixture: ComponentFixture<ReportouputDialogComponent>;
        let service: ReportouputService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReportgatewayTestModule],
                declarations: [ReportouputDialogComponent],
                providers: [
                    ReportjobService,
                    ReportouputService
                ]
            })
            .overrideTemplate(ReportouputDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReportouputDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReportouputService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Reportouput(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.reportouput = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'reportouputListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Reportouput();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.reportouput = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'reportouputListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
