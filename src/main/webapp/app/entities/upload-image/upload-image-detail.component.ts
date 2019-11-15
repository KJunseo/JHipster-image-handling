import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IUploadImage } from 'app/shared/model/upload-image.model';

@Component({
  selector: 'jhi-upload-image-detail',
  templateUrl: './upload-image-detail.component.html'
})
export class UploadImageDetailComponent implements OnInit {
  uploadImage: IUploadImage;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ uploadImage }) => {
      this.uploadImage = uploadImage;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
