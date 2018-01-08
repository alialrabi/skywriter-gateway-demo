/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ReportgatewayTestModule } from '../../../test.module';
import { ReportparameterDialogComponent } from '../../../../../../main/webapp/app/entities/reportparameter/reportparameter-dialog.component';
import { ReportparameterService } from '../../../../../../main/webapp/app/entities/reportparameter/reportparameter.service';
import { Reportparameter } from '../../../../../../main/webapp/app/entities/reportparameter/reportparameter.model';
import { ReportService } from '../../../../../../main/webapp/app/entities/report';

describe('Component Tests', () => {

    describe('Reportparameter Management Dialog Component', () => {
        let comp: ReportparameterDialogComponent;
        let fixture: ComponentFixture<ReportparameterDialogComponent>;
        let service: ReportparameterService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReportgatewayTestModule],
                declarations: [ReportparameterDialogComponent],
                providers: [
                    ReportService,
                    ReportparameterService
                ]
            })
            .overrideTemplate(ReportparameterDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReportparameterDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReportparameterService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Reportparameter(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.reportparameter = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'reportparameterListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Reportparameter();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.reportparameter = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'reportparameterListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
