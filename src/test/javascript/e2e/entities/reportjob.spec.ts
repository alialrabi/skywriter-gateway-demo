import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Reportjob e2e test', () => {

    let navBarPage: NavBarPage;
    let reportjobDialogPage: ReportjobDialogPage;
    let reportjobComponentsPage: ReportjobComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Reportjobs', () => {
        navBarPage.goToEntity('reportjob');
        reportjobComponentsPage = new ReportjobComponentsPage();
        expect(reportjobComponentsPage.getTitle()).toMatch(/reportgatewayApp.reportjob.home.title/);

    });

    it('should load create Reportjob dialog', () => {
        reportjobComponentsPage.clickOnCreateButton();
        reportjobDialogPage = new ReportjobDialogPage();
        expect(reportjobDialogPage.getModalTitle()).toMatch(/reportgatewayApp.reportjob.home.createOrEditLabel/);
        reportjobDialogPage.close();
    });

    it('should create and save Reportjobs', () => {
        reportjobComponentsPage.clickOnCreateButton();
        reportjobDialogPage.setNameInput('name');
        expect(reportjobDialogPage.getNameInput()).toMatch('name');
        reportjobDialogPage.setDescriptionInput('description');
        expect(reportjobDialogPage.getDescriptionInput()).toMatch('description');
        reportjobDialogPage.setStatusInput('status');
        expect(reportjobDialogPage.getStatusInput()).toMatch('status');
        reportjobDialogPage.setLastmodiefiedbyInput('lastmodiefiedby');
        expect(reportjobDialogPage.getLastmodiefiedbyInput()).toMatch('lastmodiefiedby');
        reportjobDialogPage.setLastmodiefieddatetimeInput(12310020012301);
        expect(reportjobDialogPage.getLastmodiefieddatetimeInput()).toMatch('2001-12-31T02:30');
        reportjobDialogPage.setDomainInput('domain');
        expect(reportjobDialogPage.getDomainInput()).toMatch('domain');
        reportjobDialogPage.reportouputSelectLastOption();
        reportjobDialogPage.save();
        expect(reportjobDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ReportjobComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-reportjob div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ReportjobDialogPage {
    modalTitle = element(by.css('h4#myReportjobLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    descriptionInput = element(by.css('input#field_description'));
    statusInput = element(by.css('input#field_status'));
    lastmodiefiedbyInput = element(by.css('input#field_lastmodiefiedby'));
    lastmodiefieddatetimeInput = element(by.css('input#field_lastmodiefieddatetime'));
    domainInput = element(by.css('input#field_domain'));
    reportouputSelect = element(by.css('select#field_reportouput'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    }

    setStatusInput = function(status) {
        this.statusInput.sendKeys(status);
    }

    getStatusInput = function() {
        return this.statusInput.getAttribute('value');
    }

    setLastmodiefiedbyInput = function(lastmodiefiedby) {
        this.lastmodiefiedbyInput.sendKeys(lastmodiefiedby);
    }

    getLastmodiefiedbyInput = function() {
        return this.lastmodiefiedbyInput.getAttribute('value');
    }

    setLastmodiefieddatetimeInput = function(lastmodiefieddatetime) {
        this.lastmodiefieddatetimeInput.sendKeys(lastmodiefieddatetime);
    }

    getLastmodiefieddatetimeInput = function() {
        return this.lastmodiefieddatetimeInput.getAttribute('value');
    }

    setDomainInput = function(domain) {
        this.domainInput.sendKeys(domain);
    }

    getDomainInput = function() {
        return this.domainInput.getAttribute('value');
    }

    reportouputSelectLastOption = function() {
        this.reportouputSelect.all(by.tagName('option')).last().click();
    }

    reportouputSelectOption = function(option) {
        this.reportouputSelect.sendKeys(option);
    }

    getReportouputSelect = function() {
        return this.reportouputSelect;
    }

    getReportouputSelectedOption = function() {
        return this.reportouputSelect.element(by.css('option:checked')).getText();
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
