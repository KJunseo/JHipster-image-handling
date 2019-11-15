import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IUploadImage } from 'app/shared/model/upload-image.model';
import { AccountService } from 'app/core';
import { UploadImageService } from './upload-image.service';

@Component({
  selector: 'jhi-upload-image',
  templateUrl: './upload-image.component.html'
})
export class UploadImageComponent implements OnInit, OnDestroy {
  uploadImages: IUploadImage[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected uploadImageService: UploadImageService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.uploadImageService
      .query()
      .pipe(
        filter((res: HttpResponse<IUploadImage[]>) => res.ok),
        map((res: HttpResponse<IUploadImage[]>) => res.body)
      )
      .subscribe(
        (res: IUploadImage[]) => {
          this.uploadImages = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInUploadImages();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IUploadImage) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInUploadImages() {
    this.eventSubscriber = this.eventManager.subscribe('uploadImageListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
