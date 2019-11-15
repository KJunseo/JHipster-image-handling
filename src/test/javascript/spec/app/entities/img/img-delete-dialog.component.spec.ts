/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ImageHandlerTestModule } from '../../../test.module';
import { ImgDeleteDialogComponent } from 'app/entities/img/img-delete-dialog.component';
import { ImgService } from 'app/entities/img/img.service';

describe('Component Tests', () => {
  describe('Img Management Delete Component', () => {
    let comp: ImgDeleteDialogComponent;
    let fixture: ComponentFixture<ImgDeleteDialogComponent>;
    let service: ImgService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ImageHandlerTestModule],
        declarations: [ImgDeleteDialogComponent]
      })
        .overrideTemplate(ImgDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ImgDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ImgService);
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
