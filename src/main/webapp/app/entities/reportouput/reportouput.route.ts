import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ReportouputComponent } from './reportouput.component';
import { ReportouputDetailComponent } from './reportouput-detail.component';
import { ReportouputPopupComponent } from './reportouput-dialog.component';
import { ReportouputDeletePopupComponent } from './reportouput-delete-dialog.component';

@Injectable()
export class ReportouputResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const reportouputRoute: Routes = [
    {
        path: 'reportouput',
        component: ReportouputComponent,
        resolve: {
            'pagingParams': ReportouputResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reportgatewayApp.reportouput.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'reportouput/:id',
        component: ReportouputDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reportgatewayApp.reportouput.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const reportouputPopupRoute: Routes = [
    {
        path: 'reportouput-new',
        component: ReportouputPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reportgatewayApp.reportouput.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'reportouput/:id/edit',
        component: ReportouputPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reportgatewayApp.reportouput.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'reportouput/:id/delete',
        component: ReportouputDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reportgatewayApp.reportouput.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
