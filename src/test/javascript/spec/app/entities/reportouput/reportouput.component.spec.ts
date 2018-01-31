/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { ReportgatewayTestModule } from '../../../test.module';
import { ReportouputComponent } from '../../../../../../main/webapp/app/entities/reportouput/reportouput.component';
import { ReportouputService } from '../../../../../../main/webapp/app/entities/reportouput/reportouput.service';
import { Reportouput } from '../../../../../../main/webapp/app/entities/reportouput/reportouput.model';

describe('Component Tests', () => {

    describe('Reportouput Management Component', () => {
        let comp: ReportouputComponent;
        let fixture: ComponentFixture<ReportouputComponent>;
        let service: ReportouputService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReportgatewayTestModule],
                declarations: [ReportouputComponent],
                providers: [
                    ReportouputService
                ]
            })
            .overrideTemplate(ReportouputComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReportouputComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReportouputService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Reportouput(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.reportouputs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
