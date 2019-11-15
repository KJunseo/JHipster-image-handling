import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Img } from 'app/shared/model/img.model';
import { ImgService } from './img.service';
import { ImgComponent } from './img.component';
import { ImgDetailComponent } from './img-detail.component';
import { ImgUpdateComponent } from './img-update.component';
import { ImgDeletePopupComponent } from './img-delete-dialog.component';
import { IImg } from 'app/shared/model/img.model';

@Injectable({ providedIn: 'root' })
export class ImgResolve implements Resolve<IImg> {
  constructor(private service: ImgService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IImg> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Img>) => response.ok),
        map((img: HttpResponse<Img>) => img.body)
      );
    }
    return of(new Img());
  }
}

export const imgRoute: Routes = [
  {
    path: '',
    component: ImgComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Imgs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ImgDetailComponent,
    resolve: {
      img: ImgResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Imgs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ImgUpdateComponent,
    resolve: {
      img: ImgResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Imgs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ImgUpdateComponent,
    resolve: {
      img: ImgResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Imgs'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const imgPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ImgDeletePopupComponent,
    resolve: {
      img: ImgResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Imgs'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
