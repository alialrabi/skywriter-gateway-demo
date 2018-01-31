import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Report } from './report.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ReportService {

    private resourceUrl = '/report/api/reports';
    private resourceSearchUrl = '/report/api/_search/reports';
    private parameterListUrl = 'report/api/parameterList';
    private generateReportUrl = 'report/api/generateReport';
    private scheduleReportUrl = 'report/api/schedule';
    private reportparametersUrl = 'report/api/getreportparameters';
    

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(report: Report): Observable<Report> {
        const copy = this.convert(report);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(report: Report): Observable<Report> {
        const copy = this.convert(report);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Report> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    reportparameters(reportId: number): Observable<Response> {
        return this.http.get(`${this.reportparametersUrl}/${reportId}`);
    }
    
     parameterList(reportId: number): Observable<Response> {
        return this.http.get(`${this.parameterListUrl}/${reportId}`);
    }

    generateReport(reportId: number, parameters: any): Observable<Response> {
        return this.http.get(`${this.generateReportUrl}/${reportId}/${parameters}`);
    }
    
    schedulereports(reportId: number, parameters: any): Observable<Response> {
        return this.http.get(`${this.scheduleReportUrl}/${reportId}/${parameters}`);
    }
    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Report.
     */
    private convertItemFromServer(json: any): Report {
        const entity: Report = Object.assign(new Report(), json);
        entity.lastmodifieddatetime = this.dateUtils
            .convertDateTimeFromServer(json.lastmodifieddatetime);
        return entity;
    }

    /**
     * Convert a Report to a JSON which can be sent to the server.
     */
    private convert(report: Report): Report {
        const copy: Report = Object.assign({}, report);

        copy.lastmodifieddatetime = this.dateUtils.toDate(report.lastmodifieddatetime);
        return copy;
    }
}
