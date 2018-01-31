/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { ReportgatewayTestModule } from '../../../test.module';
import { ReportouputDetailComponent } from '../../../../../../main/webapp/app/entities/reportouput/reportouput-detail.component';
import { ReportouputService } from '../../../../../../main/webapp/app/entities/reportouput/reportouput.service';
import { Reportouput } from '../../../../../../main/webapp/app/entities/reportouput/reportouput.model';

describe('Component Tests', () => {

    describe('Reportouput Management Detail Component', () => {
        let comp: ReportouputDetailComponent;
        let fixture: ComponentFixture<ReportouputDetailComponent>;
        let service: ReportouputService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReportgatewayTestModule],
                declarations: [ReportouputDetailComponent],
                providers: [
                    ReportouputService
                ]
            })
            .overrideTemplate(ReportouputDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReportouputDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReportouputService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Reportouput(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.reportouput).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
