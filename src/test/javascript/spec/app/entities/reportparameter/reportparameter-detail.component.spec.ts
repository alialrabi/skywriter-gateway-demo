/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { ReportgatewayTestModule } from '../../../test.module';
import { ReportparameterDetailComponent } from '../../../../../../main/webapp/app/entities/reportparameter/reportparameter-detail.component';
import { ReportparameterService } from '../../../../../../main/webapp/app/entities/reportparameter/reportparameter.service';
import { Reportparameter } from '../../../../../../main/webapp/app/entities/reportparameter/reportparameter.model';

describe('Component Tests', () => {

    describe('Reportparameter Management Detail Component', () => {
        let comp: ReportparameterDetailComponent;
        let fixture: ComponentFixture<ReportparameterDetailComponent>;
        let service: ReportparameterService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReportgatewayTestModule],
                declarations: [ReportparameterDetailComponent],
                providers: [
                    ReportparameterService
                ]
            })
            .overrideTemplate(ReportparameterDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReportparameterDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReportparameterService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Reportparameter(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.reportparameter).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
