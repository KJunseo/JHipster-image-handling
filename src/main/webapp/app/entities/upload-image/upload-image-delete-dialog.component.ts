import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUploadImage } from 'app/shared/model/upload-image.model';
import { UploadImageService } from './upload-image.service';

@Component({
  selector: 'jhi-upload-image-delete-dialog',
  templateUrl: './upload-image-delete-dialog.component.html'
})
export class UploadImageDeleteDialogComponent {
  uploadImage: IUploadImage;

  constructor(
    protected uploadImageService: UploadImageService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.uploadImageService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'uploadImageListModification',
        content: 'Deleted an uploadImage'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-upload-image-delete-popup',
  template: ''
})
export class UploadImageDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ uploadImage }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(UploadImageDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.uploadImage = uploadImage;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/upload-image', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/upload-image', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
