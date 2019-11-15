import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImageHandlerSharedModule } from 'app/shared';
import {
  ImageComponent,
  ImageDetailComponent,
  ImageUpdateComponent,
  ImageDeletePopupComponent,
  ImageDeleteDialogComponent,
  imageRoute,
  imagePopupRoute
} from './';

const ENTITY_STATES = [...imageRoute, ...imagePopupRoute];

@NgModule({
  imports: [ImageHandlerSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [ImageComponent, ImageDetailComponent, ImageUpdateComponent, ImageDeleteDialogComponent, ImageDeletePopupComponent],
  entryComponents: [ImageComponent, ImageUpdateComponent, ImageDeleteDialogComponent, ImageDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ImageHandlerImageModule {}
