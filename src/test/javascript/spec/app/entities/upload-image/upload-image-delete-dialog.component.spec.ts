/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ImageHandlerTestModule } from '../../../test.module';
import { UploadImageDeleteDialogComponent } from 'app/entities/upload-image/upload-image-delete-dialog.component';
import { UploadImageService } from 'app/entities/upload-image/upload-image.service';

describe('Component Tests', () => {
  describe('UploadImage Management Delete Component', () => {
    let comp: UploadImageDeleteDialogComponent;
    let fixture: ComponentFixture<UploadImageDeleteDialogComponent>;
    let service: UploadImageService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ImageHandlerTestModule],
        declarations: [UploadImageDeleteDialogComponent]
      })
        .overrideTemplate(UploadImageDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UploadImageDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UploadImageService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
