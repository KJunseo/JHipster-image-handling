import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ImageHandlerSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [ImageHandlerSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [ImageHandlerSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ImageHandlerSharedModule {
  static forRoot() {
    return {
      ngModule: ImageHandlerSharedModule
    };
  }
}
