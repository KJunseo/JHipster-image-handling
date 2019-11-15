import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImageHandlerSharedModule } from 'app/shared';
import {
  ImgComponent,
  ImgDetailComponent,
  ImgUpdateComponent,
  ImgDeletePopupComponent,
  ImgDeleteDialogComponent,
  imgRoute,
  imgPopupRoute
} from './';

const ENTITY_STATES = [...imgRoute, ...imgPopupRoute];

@NgModule({
  imports: [ImageHandlerSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [ImgComponent, ImgDetailComponent, ImgUpdateComponent, ImgDeleteDialogComponent, ImgDeletePopupComponent],
  entryComponents: [ImgComponent, ImgUpdateComponent, ImgDeleteDialogComponent, ImgDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ImageHandlerImgModule {}
