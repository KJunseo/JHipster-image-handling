import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IImg } from 'app/shared/model/img.model';
import { ImgService } from './img.service';

@Component({
  selector: 'jhi-img-delete-dialog',
  templateUrl: './img-delete-dialog.component.html'
})
export class ImgDeleteDialogComponent {
  img: IImg;

  constructor(protected imgService: ImgService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.imgService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'imgListModification',
        content: 'Deleted an img'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-img-delete-popup',
  template: ''
})
export class ImgDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ img }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ImgDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.img = img;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/img', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/img', { outlets: { popup: null } }]);
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
