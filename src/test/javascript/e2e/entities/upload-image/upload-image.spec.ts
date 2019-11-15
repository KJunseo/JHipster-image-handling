/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { UploadImageComponentsPage, UploadImageDeleteDialog, UploadImageUpdatePage } from './upload-image.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('UploadImage e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let uploadImageUpdatePage: UploadImageUpdatePage;
  let uploadImageComponentsPage: UploadImageComponentsPage;
  let uploadImageDeleteDialog: UploadImageDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load UploadImages', async () => {
    await navBarPage.goToEntity('upload-image');
    uploadImageComponentsPage = new UploadImageComponentsPage();
    await browser.wait(ec.visibilityOf(uploadImageComponentsPage.title), 5000);
    expect(await uploadImageComponentsPage.getTitle()).to.eq('Upload Images');
  });

  it('should load create UploadImage page', async () => {
    await uploadImageComponentsPage.clickOnCreateButton();
    uploadImageUpdatePage = new UploadImageUpdatePage();
    expect(await uploadImageUpdatePage.getPageTitle()).to.eq('Create or edit a Upload Image');
    await uploadImageUpdatePage.cancel();
  });

  it('should create and save UploadImages', async () => {
    const nbButtonsBeforeCreate = await uploadImageComponentsPage.countDeleteButtons();

    await uploadImageComponentsPage.clickOnCreateButton();
    await promise.all([
      uploadImageUpdatePage.setImageNameInput('imageName'),
      uploadImageUpdatePage.setImagePathInput('imagePath'),
      uploadImageUpdatePage.setImageInput(absolutePath)
    ]);
    expect(await uploadImageUpdatePage.getImageNameInput()).to.eq('imageName', 'Expected ImageName value to be equals to imageName');
    expect(await uploadImageUpdatePage.getImagePathInput()).to.eq('imagePath', 'Expected ImagePath value to be equals to imagePath');
    expect(await uploadImageUpdatePage.getImageInput()).to.endsWith(
      fileNameToUpload,
      'Expected Image value to be end with ' + fileNameToUpload
    );
    await uploadImageUpdatePage.save();
    expect(await uploadImageUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await uploadImageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last UploadImage', async () => {
    const nbButtonsBeforeDelete = await uploadImageComponentsPage.countDeleteButtons();
    await uploadImageComponentsPage.clickOnLastDeleteButton();

    uploadImageDeleteDialog = new UploadImageDeleteDialog();
    expect(await uploadImageDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Upload Image?');
    await uploadImageDeleteDialog.clickOnConfirmButton();

    expect(await uploadImageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
