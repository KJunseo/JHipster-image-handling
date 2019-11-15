/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ImgComponentsPage, ImgDeleteDialog, ImgUpdatePage } from './img.page-object';

const expect = chai.expect;

describe('Img e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let imgUpdatePage: ImgUpdatePage;
  let imgComponentsPage: ImgComponentsPage;
  let imgDeleteDialog: ImgDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Imgs', async () => {
    await navBarPage.goToEntity('img');
    imgComponentsPage = new ImgComponentsPage();
    await browser.wait(ec.visibilityOf(imgComponentsPage.title), 5000);
    expect(await imgComponentsPage.getTitle()).to.eq('Imgs');
  });

  it('should load create Img page', async () => {
    await imgComponentsPage.clickOnCreateButton();
    imgUpdatePage = new ImgUpdatePage();
    expect(await imgUpdatePage.getPageTitle()).to.eq('Create or edit a Img');
    await imgUpdatePage.cancel();
  });

  it('should create and save Imgs', async () => {
    const nbButtonsBeforeCreate = await imgComponentsPage.countDeleteButtons();

    await imgComponentsPage.clickOnCreateButton();
    await promise.all([
      imgUpdatePage.setTitleInput('title'),
      imgUpdatePage.setContentInput('content'),
      imgUpdatePage.setWriterInput('writer'),
      imgUpdatePage.setDateInput('date'),
      imgUpdatePage.setImage_pathInput('image_path')
    ]);
    expect(await imgUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await imgUpdatePage.getContentInput()).to.eq('content', 'Expected Content value to be equals to content');
    expect(await imgUpdatePage.getWriterInput()).to.eq('writer', 'Expected Writer value to be equals to writer');
    expect(await imgUpdatePage.getDateInput()).to.eq('date', 'Expected Date value to be equals to date');
    expect(await imgUpdatePage.getImage_pathInput()).to.eq('image_path', 'Expected Image_path value to be equals to image_path');
    await imgUpdatePage.save();
    expect(await imgUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await imgComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Img', async () => {
    const nbButtonsBeforeDelete = await imgComponentsPage.countDeleteButtons();
    await imgComponentsPage.clickOnLastDeleteButton();

    imgDeleteDialog = new ImgDeleteDialog();
    expect(await imgDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Img?');
    await imgDeleteDialog.clickOnConfirmButton();

    expect(await imgComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
