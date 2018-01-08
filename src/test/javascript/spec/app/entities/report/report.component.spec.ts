/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { ReportgatewayTestModule } from '../../../test.module';
import { ReportComponent } from '../../../../../../main/webapp/app/entities/report/report.component';
import { ReportService } from '../../../../../../main/webapp/app/entities/report/report.service';
import { Report } from '../../../../../../main/webapp/app/entities/report/report.model';

describe('Component Tests', () => {

    describe('Report Management Component', () => {
        let comp: ReportComponent;
        let fixture: ComponentFixture<ReportComponent>;
        let service: ReportService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReportgatewayTestModule],
                declarations: [ReportComponent],
                providers: [
                    ReportService
                ]
            })
            .overrideTemplate(ReportComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReportComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReportService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Report(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.reports[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
