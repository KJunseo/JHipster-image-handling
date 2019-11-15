/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ImageHandlerTestModule } from '../../../test.module';
import { UploadImageComponent } from 'app/entities/upload-image/upload-image.component';
import { UploadImageService } from 'app/entities/upload-image/upload-image.service';
import { UploadImage } from 'app/shared/model/upload-image.model';

describe('Component Tests', () => {
  describe('UploadImage Management Component', () => {
    let comp: UploadImageComponent;
    let fixture: ComponentFixture<UploadImageComponent>;
    let service: UploadImageService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ImageHandlerTestModule],
        declarations: [UploadImageComponent],
        providers: []
      })
        .overrideTemplate(UploadImageComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UploadImageComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UploadImageService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UploadImage(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.uploadImages[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
