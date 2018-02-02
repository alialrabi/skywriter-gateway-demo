import { Component, OnInit, OnDestroy, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs/Rx';

import { DatePipe } from '@angular/common';
import { JhiEventManager, JhiDataUtils ,JhiAlertService} from 'ng-jhipster';
import {  NgbModalRef ,NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Report } from './report.model';
import { ReportService } from './report.service';
import { Response, Http, ResponseContentType } from '@angular/http';
import * as $ from "jquery";
import { saveAs } from 'file-saver';

import { ResponseWrapper } from "../../shared";

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
    isSaving: boolean;
    reportparameters: any;


    @ViewChild('parametermodal') el:ElementRef;

    constructor(
        private datePipe: DatePipe,
        private jhiAlertService: JhiAlertService,  
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private reportService: ReportService,
        private route: ActivatedRoute,
        private modalService: NgbModal,
        private  http: Http,
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
            this.reportService.reportparameters(report.id).subscribe((parameters: Response) => {
        		 this.reportparameters=parameters.json();
        		 console.log(parameters.json());
        });
        });
       
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    
    previousState() {
        window.history.back();
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
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
    
    private subscribeToSaveResponse(result: Observable<Report>) {
        result.subscribe((res: Report) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Report) {
        this.eventManager.broadcast({ name: 'reportListModification', content: 'OK'});
        this.isSaving = false;
    }

    private onSaveError() {
        this.isSaving = false;
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
    
    
    createReport(){
     console.log(this.report.id);
     if(this.report.reportclass.toString() === 'online'){
          console.log("online");
          this.generateReport();
      }else if(this.report.reportclass.toString() === 'schedule'){
        console.log("scheduled");
        this.reportService.parameterList(this.report.id).subscribe((parameters: Response) => {

         	if ( parameters.json().length <= 0 ){

           	var jsonString = JSON.stringify(parameters.json());        	               
                         let formData = new FormData();
        this.reportService.schedulereports(this.report.id,jsonString).subscribe((res: Response) => {
           console.log("Done");
        });
        }
        });
      }   
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
            this.http.post("/report/api/generateReport", formData ,{responseType: ResponseContentType.Blob})
              .subscribe( 
                res => {
                  var blob = new Blob([res["_body"]], {type: 'application/pdf'});
        	          saveAs(blob, this.report.reporttemplatename+"."+this.report.reportoutputtypecode);
                 }, error => {
                    this.jhiAlertService.info(" Error ");
           }
        );                        
                                            
                }else{
                    console.log(parameters.json());
            		this.parameters=parameters.json();
            		this.open(this.el);
        		}
        	});
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
    
        
}