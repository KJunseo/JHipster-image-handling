/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ImageHandlerTestModule } from '../../../test.module';
import { ImgUpdateComponent } from 'app/entities/img/img-update.component';
import { ImgService } from 'app/entities/img/img.service';
import { Img } from 'app/shared/model/img.model';

describe('Component Tests', () => {
  describe('Img Management Update Component', () => {
    let comp: ImgUpdateComponent;
    let fixture: ComponentFixture<ImgUpdateComponent>;
    let service: ImgService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ImageHandlerTestModule],
        declarations: [ImgUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ImgUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ImgUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ImgService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Img(123);
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
        const entity = new Img();
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
