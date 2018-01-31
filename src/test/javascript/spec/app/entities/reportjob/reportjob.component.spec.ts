/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { ReportgatewayTestModule } from '../../../test.module';
import { ReportjobComponent } from '../../../../../../main/webapp/app/entities/reportjob/reportjob.component';
import { ReportjobService } from '../../../../../../main/webapp/app/entities/reportjob/reportjob.service';
import { Reportjob } from '../../../../../../main/webapp/app/entities/reportjob/reportjob.model';

describe('Component Tests', () => {

    describe('Reportjob Management Component', () => {
        let comp: ReportjobComponent;
        let fixture: ComponentFixture<ReportjobComponent>;
        let service: ReportjobService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReportgatewayTestModule],
                declarations: [ReportjobComponent],
                providers: [
                    ReportjobService
                ]
            })
            .overrideTemplate(ReportjobComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReportjobComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReportjobService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Reportjob(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.reportjobs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
