import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Bucket e2e test', () => {

    let navBarPage: NavBarPage;
    let bucketDialogPage: BucketDialogPage;
    let bucketComponentsPage: BucketComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Buckets', () => {
        navBarPage.goToEntity('bucket');
        bucketComponentsPage = new BucketComponentsPage();
        expect(bucketComponentsPage.getTitle()).toMatch(/reportgatewayApp.bucket.home.title/);

    });

    it('should load create Bucket dialog', () => {
        bucketComponentsPage.clickOnCreateButton();
        bucketDialogPage = new BucketDialogPage();
        expect(bucketDialogPage.getModalTitle()).toMatch(/reportgatewayApp.bucket.home.createOrEditLabel/);
        bucketDialogPage.close();
    });

    it('should create and save Buckets', () => {
        bucketComponentsPage.clickOnCreateButton();
        bucketDialogPage.setNameInput('name');
        expect(bucketDialogPage.getNameInput()).toMatch('name');
        bucketDialogPage.setFolderpathInput('folderpath');
        expect(bucketDialogPage.getFolderpathInput()).toMatch('folderpath');
        bucketDialogPage.setAccesscontrolInput('accesscontrol');
        expect(bucketDialogPage.getAccesscontrolInput()).toMatch('accesscontrol');
        bucketDialogPage.save();
        expect(bucketDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BucketComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-bucket div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BucketDialogPage {
    modalTitle = element(by.css('h4#myBucketLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    folderpathInput = element(by.css('input#field_folderpath'));
    accesscontrolInput = element(by.css('input#field_accesscontrol'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    setFolderpathInput = function(folderpath) {
        this.folderpathInput.sendKeys(folderpath);
    }

    getFolderpathInput = function() {
        return this.folderpathInput.getAttribute('value');
    }

    setAccesscontrolInput = function(accesscontrol) {
        this.accesscontrolInput.sendKeys(accesscontrol);
    }

    getAccesscontrolInput = function() {
        return this.accesscontrolInput.getAttribute('value');
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
