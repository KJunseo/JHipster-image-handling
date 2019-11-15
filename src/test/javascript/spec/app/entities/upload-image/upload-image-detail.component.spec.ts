/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ImageHandlerTestModule } from '../../../test.module';
import { UploadImageDetailComponent } from 'app/entities/upload-image/upload-image-detail.component';
import { UploadImage } from 'app/shared/model/upload-image.model';

describe('Component Tests', () => {
  describe('UploadImage Management Detail Component', () => {
    let comp: UploadImageDetailComponent;
    let fixture: ComponentFixture<UploadImageDetailComponent>;
    const route = ({ data: of({ uploadImage: new UploadImage(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ImageHandlerTestModule],
        declarations: [UploadImageDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(UploadImageDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UploadImageDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.uploadImage).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
