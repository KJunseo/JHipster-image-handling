/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ImageHandlerTestModule } from '../../../test.module';
import { ImgComponent } from 'app/entities/img/img.component';
import { ImgService } from 'app/entities/img/img.service';
import { Img } from 'app/shared/model/img.model';

describe('Component Tests', () => {
  describe('Img Management Component', () => {
    let comp: ImgComponent;
    let fixture: ComponentFixture<ImgComponent>;
    let service: ImgService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ImageHandlerTestModule],
        declarations: [ImgComponent],
        providers: []
      })
        .overrideTemplate(ImgComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ImgComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ImgService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Img(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.imgs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
