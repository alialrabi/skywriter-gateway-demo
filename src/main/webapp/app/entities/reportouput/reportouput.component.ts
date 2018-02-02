import {Component, OnInit, OnDestroy, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils} from 'ng-jhipster';
import {Reportouput} from './reportouput.model';
import {ReportouputService} from './reportouput.service';
import {ITEMS_PER_PAGE, Principal, ResponseWrapper} from '../../shared';
import {Report} from '../report/report.model';
import {saveAs} from 'file-saver';

@Component({
  selector: 'jhi-reportouput',
  templateUrl: './reportouput.component.html'
})
export class ReportouputComponent implements OnInit, OnDestroy {

  report: Report;
  currentAccount: any;
  parameters: any;
  reportouputs: Reportouput[];
  reportoutput: Reportouput;
  error: any;
  success: any;
  eventSubscriber: Subscription;
  currentSearch: string;
  routeData: any;
  links: any;
  totalItems: any;
  queryCount: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;
  closeResult: string;

  @ViewChild('parametermodal') el: ElementRef;

  constructor(
    private reportouputService: ReportouputService,
    private parseLinks: JhiParseLinks,
    private jhiAlertService: JhiAlertService,
    private principal: Principal,
    private activatedRoute: ActivatedRoute,
    private dataUtils: JhiDataUtils,
    private router: Router,
    private eventManager: JhiEventManager,
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe((data) => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
    this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
      this.activatedRoute.snapshot.params['search'] : '';
  }

  loadAll() {
    if (this.currentSearch) {
      this.reportouputService.search({
        page: this.page - 1,
        query: this.currentSearch,
        size: this.itemsPerPage,
        sort: this.sort()
      }).subscribe(
        (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
        (res: ResponseWrapper) => this.onError(res.json)
        );
      return;
    }
    this.reportouputService.query({
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort()
    }).subscribe(
      (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
      (res: ResponseWrapper) => this.onError(res.json)
      );
  }
  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }
  transition() {
    this.router.navigate(['/reportouput'], {
      queryParams:
      {
        page: this.page,
        size: this.itemsPerPage,
        search: this.currentSearch,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  clear() {
    this.page = 0;
    this.currentSearch = '';
    this.router.navigate(['/reportouput', {
      page: this.page,
      sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
    }]);
    this.loadAll();
  }
  search(query) {
    if (!query) {
      return this.clear();
    }
    this.page = 0;
    this.currentSearch = query;
    this.router.navigate(['/reportouput', {
      search: this.currentSearch,
      page: this.page,
      sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
    }]);
    this.loadAll();
  }
  ngOnInit() {
    this.loadAll();
    this.principal.identity().then((account) => {
      this.currentAccount = account;
    });
    this.registerChangeInReportouputs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: Reportouput) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  
  download(contentType, field) {
        console.log(contentType)
        console.log(field)
        var blob = new Blob([field], {type: 'application/pdf'});
            saveAs(blob, 'test.pdf');
       // return this.dataUtils.openFile(contentType, field);
  }
  
  registerChangeInReportouputs() {
    this.eventSubscriber = this.eventManager.subscribe('reportouputListModification', (response) => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  private onSuccess(data, headers) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = headers.get('X-Total-Count');
    this.queryCount = this.totalItems;
    // this.page = pagingParams.page;
    this.reportouputs = data;
  }
  private onError(error) {
    this.jhiAlertService.error(error.message, null, null);
  }

  downloadFile(id) {
    console.log(id);
    this.reportouputService.find(id).subscribe((reportouput) => {
             console.log(reportouput.reportfile)
            var blob = new Blob([reportouput.reportfile], {type: 'application/pdf'});
            saveAs(blob, 'test.pdf');
    });
  }

}
