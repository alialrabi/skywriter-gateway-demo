/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { ReportgatewayTestModule } from '../../../test.module';
import { ReportDetailComponent } from '../../../../../../main/webapp/app/entities/report/report-detail.component';
import { ReportService } from '../../../../../../main/webapp/app/entities/report/report.service';
import { Report } from '../../../../../../main/webapp/app/entities/report/report.model';

describe('Component Tests', () => {

    describe('Report Management Detail Component', () => {
        let comp: ReportDetailComponent;
        let fixture: ComponentFixture<ReportDetailComponent>;
        let service: ReportService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReportgatewayTestModule],
                declarations: [ReportDetailComponent],
                providers: [
                    ReportService
                ]
            })
            .overrideTemplate(ReportDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReportDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReportService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Report(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.report).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
