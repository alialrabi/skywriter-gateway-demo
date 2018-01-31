/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { ReportgatewayTestModule } from '../../../test.module';
import { BucketComponent } from '../../../../../../main/webapp/app/entities/bucket/bucket.component';
import { BucketService } from '../../../../../../main/webapp/app/entities/bucket/bucket.service';
import { Bucket } from '../../../../../../main/webapp/app/entities/bucket/bucket.model';

describe('Component Tests', () => {

    describe('Bucket Management Component', () => {
        let comp: BucketComponent;
        let fixture: ComponentFixture<BucketComponent>;
        let service: BucketService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReportgatewayTestModule],
                declarations: [BucketComponent],
                providers: [
                    BucketService
                ]
            })
            .overrideTemplate(BucketComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BucketComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BucketService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Bucket(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.buckets[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
