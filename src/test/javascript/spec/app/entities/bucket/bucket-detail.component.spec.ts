/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { ReportgatewayTestModule } from '../../../test.module';
import { BucketDetailComponent } from '../../../../../../main/webapp/app/entities/bucket/bucket-detail.component';
import { BucketService } from '../../../../../../main/webapp/app/entities/bucket/bucket.service';
import { Bucket } from '../../../../../../main/webapp/app/entities/bucket/bucket.model';

describe('Component Tests', () => {

    describe('Bucket Management Detail Component', () => {
        let comp: BucketDetailComponent;
        let fixture: ComponentFixture<BucketDetailComponent>;
        let service: BucketService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReportgatewayTestModule],
                declarations: [BucketDetailComponent],
                providers: [
                    BucketService
                ]
            })
            .overrideTemplate(BucketDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BucketDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BucketService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Bucket(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bucket).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
