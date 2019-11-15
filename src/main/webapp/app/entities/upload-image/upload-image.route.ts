import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UploadImage } from 'app/shared/model/upload-image.model';
import { UploadImageService } from './upload-image.service';
import { UploadImageComponent } from './upload-image.component';
import { UploadImageDetailComponent } from './upload-image-detail.component';
import { UploadImageUpdateComponent } from './upload-image-update.component';
import { UploadImageDeletePopupComponent } from './upload-image-delete-dialog.component';
import { IUploadImage } from 'app/shared/model/upload-image.model';

@Injectable({ providedIn: 'root' })
export class UploadImageResolve implements Resolve<IUploadImage> {
  constructor(private service: UploadImageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUploadImage> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<UploadImage>) => response.ok),
        map((uploadImage: HttpResponse<UploadImage>) => uploadImage.body)
      );
    }
    return of(new UploadImage());
  }
}

export const uploadImageRoute: Routes = [
  {
    path: '',
    component: UploadImageComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UploadImages'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UploadImageDetailComponent,
    resolve: {
      uploadImage: UploadImageResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UploadImages'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UploadImageUpdateComponent,
    resolve: {
      uploadImage: UploadImageResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UploadImages'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: UploadImageUpdateComponent,
    resolve: {
      uploadImage: UploadImageResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UploadImages'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const uploadImagePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: UploadImageDeletePopupComponent,
    resolve: {
      uploadImage: UploadImageResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UploadImages'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
