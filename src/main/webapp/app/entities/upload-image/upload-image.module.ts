import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImageHandlerSharedModule } from 'app/shared';
import {
  UploadImageComponent,
  UploadImageDetailComponent,
  UploadImageUpdateComponent,
  UploadImageDeletePopupComponent,
  UploadImageDeleteDialogComponent,
  uploadImageRoute,
  uploadImagePopupRoute
} from './';

const ENTITY_STATES = [...uploadImageRoute, ...uploadImagePopupRoute];

@NgModule({
  imports: [ImageHandlerSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    UploadImageComponent,
    UploadImageDetailComponent,
    UploadImageUpdateComponent,
    UploadImageDeleteDialogComponent,
    UploadImageDeletePopupComponent
  ],
  entryComponents: [UploadImageComponent, UploadImageUpdateComponent, UploadImageDeleteDialogComponent, UploadImageDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ImageHandlerUploadImageModule {}
