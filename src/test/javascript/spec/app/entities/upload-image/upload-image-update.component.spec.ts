/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ImageHandlerTestModule } from '../../../test.module';
import { UploadImageUpdateComponent } from 'app/entities/upload-image/upload-image-update.component';
import { UploadImageService } from 'app/entities/upload-image/upload-image.service';
import { UploadImage } from 'app/shared/model/upload-image.model';

describe('Component Tests', () => {
  describe('UploadImage Management Update Component', () => {
    let comp: UploadImageUpdateComponent;
    let fixture: ComponentFixture<UploadImageUpdateComponent>;
    let service: UploadImageService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ImageHandlerTestModule],
        declarations: [UploadImageUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(UploadImageUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UploadImageUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UploadImageService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UploadImage(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new UploadImage();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
