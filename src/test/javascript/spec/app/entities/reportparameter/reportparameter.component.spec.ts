/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { ReportgatewayTestModule } from '../../../test.module';
import { ReportparameterComponent } from '../../../../../../main/webapp/app/entities/reportparameter/reportparameter.component';
import { ReportparameterService } from '../../../../../../main/webapp/app/entities/reportparameter/reportparameter.service';
import { Reportparameter } from '../../../../../../main/webapp/app/entities/reportparameter/reportparameter.model';

describe('Component Tests', () => {

    describe('Reportparameter Management Component', () => {
        let comp: ReportparameterComponent;
        let fixture: ComponentFixture<ReportparameterComponent>;
        let service: ReportparameterService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReportgatewayTestModule],
                declarations: [ReportparameterComponent],
                providers: [
                    ReportparameterService
                ]
            })
            .overrideTemplate(ReportparameterComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReportparameterComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReportparameterService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Reportparameter(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.reportparameters[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
