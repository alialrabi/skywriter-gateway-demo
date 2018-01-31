import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BucketComponent } from './bucket.component';
import { BucketDetailComponent } from './bucket-detail.component';
import { BucketPopupComponent } from './bucket-dialog.component';
import { BucketDeletePopupComponent } from './bucket-delete-dialog.component';

@Injectable()
export class BucketResolvePagingParams implements Resolve<any> {

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

export const bucketRoute: Routes = [
    {
        path: 'bucket',
        component: BucketComponent,
        resolve: {
            'pagingParams': BucketResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reportgatewayApp.bucket.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bucket/:id',
        component: BucketDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reportgatewayApp.bucket.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bucketPopupRoute: Routes = [
    {
        path: 'bucket-new',
        component: BucketPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reportgatewayApp.bucket.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bucket/:id/edit',
        component: BucketPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reportgatewayApp.bucket.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bucket/:id/delete',
        component: BucketDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reportgatewayApp.bucket.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
