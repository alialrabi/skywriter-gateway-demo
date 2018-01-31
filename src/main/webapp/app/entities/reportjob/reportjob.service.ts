import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Reportjob } from './reportjob.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ReportjobService {

    private resourceUrl = '/report/api/reportjobs';
    private resourceSearchUrl = '/report/api/_search/reportjobs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(reportjob: Reportjob): Observable<Reportjob> {
        const copy = this.convert(reportjob);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(reportjob: Reportjob): Observable<Reportjob> {
        const copy = this.convert(reportjob);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Reportjob> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
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
     * Convert a returned JSON object to Reportjob.
     */
    private convertItemFromServer(json: any): Reportjob {
        const entity: Reportjob = Object.assign(new Reportjob(), json);
        entity.lastmodiefieddatetime = this.dateUtils
            .convertDateTimeFromServer(json.lastmodiefieddatetime);
        return entity;
    }

    /**
     * Convert a Reportjob to a JSON which can be sent to the server.
     */
    private convert(reportjob: Reportjob): Reportjob {
        const copy: Reportjob = Object.assign({}, reportjob);

        copy.lastmodiefieddatetime = this.dateUtils.toDate(reportjob.lastmodiefieddatetime);
        return copy;
    }
}
