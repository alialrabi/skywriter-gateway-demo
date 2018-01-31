import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ReportjobComponent } from './reportjob.component';
import { ReportjobDetailComponent } from './reportjob-detail.component';
import { ReportjobPopupComponent } from './reportjob-dialog.component';
import { ReportjobDeletePopupComponent } from './reportjob-delete-dialog.component';

@Injectable()
export class ReportjobResolvePagingParams implements Resolve<any> {

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

export const reportjobRoute: Routes = [
    {
        path: 'reportjob',
        component: ReportjobComponent,
        resolve: {
            'pagingParams': ReportjobResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reportgatewayApp.reportjob.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'reportjob/:id',
        component: ReportjobDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reportgatewayApp.reportjob.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const reportjobPopupRoute: Routes = [
    {
        path: 'reportjob-new',
        component: ReportjobPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reportgatewayApp.reportjob.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'reportjob/:id/edit',
        component: ReportjobPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reportgatewayApp.reportjob.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'reportjob/:id/delete',
        component: ReportjobDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reportgatewayApp.reportjob.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
