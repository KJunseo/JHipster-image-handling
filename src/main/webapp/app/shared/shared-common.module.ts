import { NgModule } from '@angular/core';

import { ImageHandlerSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [ImageHandlerSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [ImageHandlerSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class ImageHandlerSharedCommonModule {}
