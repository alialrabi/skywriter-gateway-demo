/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { ReportgatewayTestModule } from '../../../test.module';
import { ReportjobDetailComponent } from '../../../../../../main/webapp/app/entities/reportjob/reportjob-detail.component';
import { ReportjobService } from '../../../../../../main/webapp/app/entities/reportjob/reportjob.service';
import { Reportjob } from '../../../../../../main/webapp/app/entities/reportjob/reportjob.model';

describe('Component Tests', () => {

    describe('Reportjob Management Detail Component', () => {
        let comp: ReportjobDetailComponent;
        let fixture: ComponentFixture<ReportjobDetailComponent>;
        let service: ReportjobService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReportgatewayTestModule],
                declarations: [ReportjobDetailComponent],
                providers: [
                    ReportjobService
                ]
            })
            .overrideTemplate(ReportjobDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReportjobDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReportjobService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Reportjob(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.reportjob).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
