/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ImageHandlerTestModule } from '../../../test.module';
import { ImgDetailComponent } from 'app/entities/img/img-detail.component';
import { Img } from 'app/shared/model/img.model';

describe('Component Tests', () => {
  describe('Img Management Detail Component', () => {
    let comp: ImgDetailComponent;
    let fixture: ComponentFixture<ImgDetailComponent>;
    const route = ({ data: of({ img: new Img(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ImageHandlerTestModule],
        declarations: [ImgDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ImgDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ImgDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.img).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
