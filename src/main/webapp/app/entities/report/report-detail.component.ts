import { Component, OnInit, OnDestroy, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Response, Http } from '@angular/http';
import * as $ from "jquery";
import { saveAs } from 'file-saver';
import { NgbActiveModal, NgbModalRef ,NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Report } from './report.model';

import { ReportService } from './report.service';

@Component({
    selector: 'jhi-report-detail',
    templateUrl: './report-detail.component.html'
})
export class ReportDetailComponent implements OnInit, OnDestroy {

    report: Report;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    parameters: any;
    closeResult: string;

    @ViewChild('parametermodal') el:ElementRef;
    
    constructor(
        private jhiAlertService: JhiAlertService,  
        private eventManager: JhiEventManager,
        private reportService: ReportService,
        private route: ActivatedRoute,
        private modalService: NgbModal,
        private  http: Http
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInReports();
    }

    load(id) {
        this.reportService.find(id).subscribe((report) => {
            this.report = report;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInReports() {
        this.eventSubscriber = this.eventManager.subscribe(
            'reportListModification',
            (response) => this.load(this.report.id)
        );
    }
   
     generateReportWithParam(){
            		var jsonString = JSON.stringify(this.parameters);     
            		let formData = new FormData();
                         formData.append('reportId', this.report.id.toString());
                         formData.append('parameters', jsonString); 
                 	this.http.post("/report/api/generateReport", formData)
              .subscribe( 
                res => {
                             var blob = new Blob([res], {type: 'application/pdf'});
        	                 saveAs(blob, this.report.reporttemplatename+"."+this.report.reportoutputtypecode);
                 	
                 	});
        }
    
    
      generateReport(){
        	this.reportService.parameterList(this.report.id).subscribe((parameters: Response) => {
        		 console.log(parameters.json().length)

         	if ( parameters.json().length <= 0 ){

           	var jsonString = JSON.stringify(parameters.json());        	               
                         let formData = new FormData();
                         formData.append('reportId', this.report.id.toString());
                         formData.append('parameters', jsonString); 
                         console.log(formData);                                             
            this.http.post("/report/api/generateReport", formData)
              .subscribe( 
                res => {
                  var blob = new Blob([res], {type: 'application/pdf'});
        	          saveAs(blob, this.report.reporttemplatename+"."+this.report.reportoutputtypecode);
                 }, error => {
                    this.jhiAlertService.info(" Error in uploading to Amazon S3 Storage ");
           }
        );                        
                                            
                }else{
                    console.log(parameters.json());
            		this.parameters=parameters.json();
            		this.open(this.el);
        		}
        	});
        }
        
    open(content) {
        console.log(content);
        this.modalService.open(content, { size: 'lg' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
       }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
       });
    }

    private getDismissReason(reason: any): string {
       if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
         return  `with: ${reason}`;
      }
    }
}
