import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUploadImage } from 'app/shared/model/upload-image.model';

type EntityResponseType = HttpResponse<IUploadImage>;
type EntityArrayResponseType = HttpResponse<IUploadImage[]>;

@Injectable({ providedIn: 'root' })
export class UploadImageService {
  public resourceUrl = SERVER_API_URL + 'api/upload-images';

  constructor(protected http: HttpClient) {}

  create(uploadImage: IUploadImage): Observable<EntityResponseType> {
    return this.http.post<IUploadImage>(this.resourceUrl, uploadImage, { observe: 'response' });
  }

  update(uploadImage: IUploadImage): Observable<EntityResponseType> {
    return this.http.put<IUploadImage>(this.resourceUrl, uploadImage, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUploadImage>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUploadImage[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
