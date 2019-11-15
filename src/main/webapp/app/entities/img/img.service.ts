import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IImg } from 'app/shared/model/img.model';

type EntityResponseType = HttpResponse<IImg>;
type EntityArrayResponseType = HttpResponse<IImg[]>;

@Injectable({ providedIn: 'root' })
export class ImgService {
  public resourceUrl = SERVER_API_URL + 'api/imgs';

  constructor(protected http: HttpClient) {}

  create(img: IImg): Observable<EntityResponseType> {
    return this.http.post<IImg>(this.resourceUrl, img, { observe: 'response' });
  }

  update(img: IImg): Observable<EntityResponseType> {
    return this.http.put<IImg>(this.resourceUrl, img, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IImg>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IImg[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
