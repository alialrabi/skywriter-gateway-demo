import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Report e2e test', () => {

    let navBarPage: NavBarPage;
    let reportDialogPage: ReportDialogPage;
    let reportComponentsPage: ReportComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Reports', () => {
        navBarPage.goToEntity('report');
        reportComponentsPage = new ReportComponentsPage();
        expect(reportComponentsPage.getTitle()).toMatch(/reportgatewayApp.report.home.title/);

    });

    it('should load create Report dialog', () => {
        reportComponentsPage.clickOnCreateButton();
        reportDialogPage = new ReportDialogPage();
        expect(reportDialogPage.getModalTitle()).toMatch(/reportgatewayApp.report.home.createOrEditLabel/);
        reportDialogPage.close();
    });

    it('should create and save Reports', () => {
        reportComponentsPage.clickOnCreateButton();
        reportDialogPage.setNameInput('name');
        expect(reportDialogPage.getNameInput()).toMatch('name');
        reportDialogPage.setReporttemplatenameInput('reporttemplatename');
        expect(reportDialogPage.getReporttemplatenameInput()).toMatch('reporttemplatename');
        reportDialogPage.setReportoutputtypecodeInput('reportoutputtypecode');
        expect(reportDialogPage.getReportoutputtypecodeInput()).toMatch('reportoutputtypecode');
        reportDialogPage.setStatusInput('status');
        expect(reportDialogPage.getStatusInput()).toMatch('status');
        reportDialogPage.setLastmodifiedbyInput('lastmodifiedby');
        expect(reportDialogPage.getLastmodifiedbyInput()).toMatch('lastmodifiedby');
        reportDialogPage.setLastmodifieddatetimeInput(12310020012301);
        expect(reportDialogPage.getLastmodifieddatetimeInput()).toMatch('2001-12-31T02:30');
        reportDialogPage.setDomainInput('domain');
        expect(reportDialogPage.getDomainInput()).toMatch('domain');
        reportDialogPage.save();
        expect(reportDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ReportComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-report div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ReportDialogPage {
    modalTitle = element(by.css('h4#myReportLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    reporttemplatenameInput = element(by.css('input#field_reporttemplatename'));
    reportoutputtypecodeInput = element(by.css('input#field_reportoutputtypecode'));
    statusInput = element(by.css('input#field_status'));
    lastmodifiedbyInput = element(by.css('input#field_lastmodifiedby'));
    lastmodifieddatetimeInput = element(by.css('input#field_lastmodifieddatetime'));
    domainInput = element(by.css('input#field_domain'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    setReporttemplatenameInput = function(reporttemplatename) {
        this.reporttemplatenameInput.sendKeys(reporttemplatename);
    }

    getReporttemplatenameInput = function() {
        return this.reporttemplatenameInput.getAttribute('value');
    }

    setReportoutputtypecodeInput = function(reportoutputtypecode) {
        this.reportoutputtypecodeInput.sendKeys(reportoutputtypecode);
    }

    getReportoutputtypecodeInput = function() {
        return this.reportoutputtypecodeInput.getAttribute('value');
    }

    setStatusInput = function(status) {
        this.statusInput.sendKeys(status);
    }

    getStatusInput = function() {
        return this.statusInput.getAttribute('value');
    }

    setLastmodifiedbyInput = function(lastmodifiedby) {
        this.lastmodifiedbyInput.sendKeys(lastmodifiedby);
    }

    getLastmodifiedbyInput = function() {
        return this.lastmodifiedbyInput.getAttribute('value');
    }

    setLastmodifieddatetimeInput = function(lastmodifieddatetime) {
        this.lastmodifieddatetimeInput.sendKeys(lastmodifieddatetime);
    }

    getLastmodifieddatetimeInput = function() {
        return this.lastmodifieddatetimeInput.getAttribute('value');
    }

    setDomainInput = function(domain) {
        this.domainInput.sendKeys(domain);
    }

    getDomainInput = function() {
        return this.domainInput.getAttribute('value');
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
