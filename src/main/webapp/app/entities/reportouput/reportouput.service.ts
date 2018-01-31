import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Reportouput } from './reportouput.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ReportouputService {

    private resourceUrl = '/report/api/reportouputs';
    private resourceSearchUrl = '/report/api/_search/reportouputs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(reportouput: Reportouput): Observable<Reportouput> {
        const copy = this.convert(reportouput);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(reportouput: Reportouput): Observable<Reportouput> {
        const copy = this.convert(reportouput);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Reportouput> {
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
     * Convert a returned JSON object to Reportouput.
     */
    private convertItemFromServer(json: any): Reportouput {
        const entity: Reportouput = Object.assign(new Reportouput(), json);
        entity.lastmodifieddatetime = this.dateUtils
            .convertDateTimeFromServer(json.lastmodifieddatetime);
        return entity;
    }

    /**
     * Convert a Reportouput to a JSON which can be sent to the server.
     */
    private convert(reportouput: Reportouput): Reportouput {
        const copy: Reportouput = Object.assign({}, reportouput);

        copy.lastmodifieddatetime = this.dateUtils.toDate(reportouput.lastmodifieddatetime);
        return copy;
    }
}
