import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class UploadImageComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-upload-image div table .btn-danger'));
  title = element.all(by.css('jhi-upload-image div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getText();
  }
}

export class UploadImageUpdatePage {
  pageTitle = element(by.id('jhi-upload-image-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  imageNameInput = element(by.id('field_imageName'));
  imagePathInput = element(by.id('field_imagePath'));
  imageInput = element(by.id('file_image'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setImageNameInput(imageName) {
    await this.imageNameInput.sendKeys(imageName);
  }

  async getImageNameInput() {
    return await this.imageNameInput.getAttribute('value');
  }

  async setImagePathInput(imagePath) {
    await this.imagePathInput.sendKeys(imagePath);
  }

  async getImagePathInput() {
    return await this.imagePathInput.getAttribute('value');
  }

  async setImageInput(image) {
    await this.imageInput.sendKeys(image);
  }

  async getImageInput() {
    return await this.imageInput.getAttribute('value');
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class UploadImageDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-uploadImage-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-uploadImage'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
