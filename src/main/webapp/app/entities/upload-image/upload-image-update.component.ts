import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IUploadImage, UploadImage } from 'app/shared/model/upload-image.model';
import { UploadImageService } from './upload-image.service';

@Component({
  selector: 'jhi-upload-image-update',
  templateUrl: './upload-image-update.component.html'
})
export class UploadImageUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    imageName: [],
    imagePath: [],
    image: [],
    imageContentType: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected uploadImageService: UploadImageService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ uploadImage }) => {
      this.updateForm(uploadImage);
    });
  }

  updateForm(uploadImage: IUploadImage) {
    this.editForm.patchValue({
      id: uploadImage.id,
      imageName: uploadImage.imageName,
      imagePath: uploadImage.imagePath,
      image: uploadImage.image,
      imageContentType: uploadImage.imageContentType
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string) {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const uploadImage = this.createFromForm();
    if (uploadImage.id !== undefined) {
      this.subscribeToSaveResponse(this.uploadImageService.update(uploadImage));
    } else {
      this.subscribeToSaveResponse(this.uploadImageService.create(uploadImage));
    }
  }

  private createFromForm(): IUploadImage {
    return {
      ...new UploadImage(),
      id: this.editForm.get(['id']).value,
      imageName: this.editForm.get(['imageName']).value,
      imagePath: this.editForm.get(['imagePath']).value,
      imageContentType: this.editForm.get(['imageContentType']).value,
      image: this.editForm.get(['image']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUploadImage>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
