import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ImgComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-img div table .btn-danger'));
  title = element.all(by.css('jhi-img div h2#page-heading span')).first();

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

export class ImgUpdatePage {
  pageTitle = element(by.id('jhi-img-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  titleInput = element(by.id('field_title'));
  contentInput = element(by.id('field_content'));
  writerInput = element(by.id('field_writer'));
  dateInput = element(by.id('field_date'));
  image_pathInput = element(by.id('field_image_path'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return await this.titleInput.getAttribute('value');
  }

  async setContentInput(content) {
    await this.contentInput.sendKeys(content);
  }

  async getContentInput() {
    return await this.contentInput.getAttribute('value');
  }

  async setWriterInput(writer) {
    await this.writerInput.sendKeys(writer);
  }

  async getWriterInput() {
    return await this.writerInput.getAttribute('value');
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return await this.dateInput.getAttribute('value');
  }

  async setImage_pathInput(image_path) {
    await this.image_pathInput.sendKeys(image_path);
  }

  async getImage_pathInput() {
    return await this.image_pathInput.getAttribute('value');
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

export class ImgDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-img-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-img'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
