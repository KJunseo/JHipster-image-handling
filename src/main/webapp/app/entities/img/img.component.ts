import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IImg } from 'app/shared/model/img.model';
import { AccountService, User, UserService } from 'app/core';
import { ImgService } from './img.service';

@Component({
  selector: 'jhi-img',
  templateUrl: './img.component.html'
})
export class ImgComponent implements OnInit, OnDestroy {
  imgs: IImg[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentUser: any;

  constructor(
    protected imgService: ImgService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService,
    protected userService: UserService
  ) {}

  loadAll() {
    this.imgService
      .query()
      .pipe(
        filter((res: HttpResponse<IImg[]>) => res.ok),
        map((res: HttpResponse<IImg[]>) => res.body)
      )
      .subscribe(
        (res: IImg[]) => {
          this.imgs = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.getCurrentUser();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInImgs();
  }

  getCurrentUser() {
    this.userService
      .getCurrentUser()
      .pipe(
        filter((mayBeOk: HttpResponse<string>) => mayBeOk.ok),
        map((response: HttpResponse<string>) => response.body)
      )
      .subscribe(user => {
        this.currentUser = user;
      });
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IImg) {
    return item.id;
  }

  registerChangeInImgs() {
    this.eventSubscriber = this.eventManager.subscribe('imgListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
