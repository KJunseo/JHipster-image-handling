import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IImg } from 'app/shared/model/img.model';
import { JhiDataUtils } from 'ng-jhipster';

@Component({
  selector: 'jhi-img-detail',
  templateUrl: './img-detail.component.html'
})
export class ImgDetailComponent implements OnInit {
  img: IImg;

  constructor(protected activatedRoute: ActivatedRoute, protected dataUtils: JhiDataUtils) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ img }) => {
      this.img = img;
    });
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  previousState() {
    window.history.back();
  }
}
