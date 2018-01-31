import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
import * as path from 'path';
describe('Reportouput e2e test', () => {

    let navBarPage: NavBarPage;
    let reportouputDialogPage: ReportouputDialogPage;
    let reportouputComponentsPage: ReportouputComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Reportouputs', () => {
        navBarPage.goToEntity('reportouput');
        reportouputComponentsPage = new ReportouputComponentsPage();
        expect(reportouputComponentsPage.getTitle()).toMatch(/reportgatewayApp.reportouput.home.title/);

    });

    it('should load create Reportouput dialog', () => {
        reportouputComponentsPage.clickOnCreateButton();
        reportouputDialogPage = new ReportouputDialogPage();
        expect(reportouputDialogPage.getModalTitle()).toMatch(/reportgatewayApp.reportouput.home.createOrEditLabel/);
        reportouputDialogPage.close();
    });

    it('should create and save Reportouputs', () => {
        reportouputComponentsPage.clickOnCreateButton();
        reportouputDialogPage.setNameInput('name');
        expect(reportouputDialogPage.getNameInput()).toMatch('name');
        reportouputDialogPage.setReporttemplatenameInput('reporttemplatename');
        expect(reportouputDialogPage.getReporttemplatenameInput()).toMatch('reporttemplatename');
        reportouputDialogPage.setReportoutputtypecodeInput('reportoutputtypecode');
        expect(reportouputDialogPage.getReportoutputtypecodeInput()).toMatch('reportoutputtypecode');
        reportouputDialogPage.setStatusInput('status');
        expect(reportouputDialogPage.getStatusInput()).toMatch('status');
        reportouputDialogPage.setLastmodifiedbyInput('lastmodifiedby');
        expect(reportouputDialogPage.getLastmodifiedbyInput()).toMatch('lastmodifiedby');
        reportouputDialogPage.setLastmodifieddatetimeInput(12310020012301);
        expect(reportouputDialogPage.getLastmodifieddatetimeInput()).toMatch('2001-12-31T02:30');
        reportouputDialogPage.setDomainInput('domain');
        expect(reportouputDialogPage.getDomainInput()).toMatch('domain');
        reportouputDialogPage.setReportfileInput(absolutePath);
        reportouputDialogPage.save();
        expect(reportouputDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ReportouputComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-reportouput div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ReportouputDialogPage {
    modalTitle = element(by.css('h4#myReportouputLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    reporttemplatenameInput = element(by.css('input#field_reporttemplatename'));
    reportoutputtypecodeInput = element(by.css('input#field_reportoutputtypecode'));
    statusInput = element(by.css('input#field_status'));
    lastmodifiedbyInput = element(by.css('input#field_lastmodifiedby'));
    lastmodifieddatetimeInput = element(by.css('input#field_lastmodifieddatetime'));
    domainInput = element(by.css('input#field_domain'));
    reportfileInput = element(by.css('input#file_reportfile'));

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

    setReportfileInput = function(reportfile) {
        this.reportfileInput.sendKeys(reportfile);
    }

    getReportfileInput = function() {
        return this.reportfileInput.getAttribute('value');
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
