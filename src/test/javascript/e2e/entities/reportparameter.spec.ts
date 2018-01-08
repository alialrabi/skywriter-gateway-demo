import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Reportparameter e2e test', () => {

    let navBarPage: NavBarPage;
    let reportparameterDialogPage: ReportparameterDialogPage;
    let reportparameterComponentsPage: ReportparameterComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Reportparameters', () => {
        navBarPage.goToEntity('reportparameter');
        reportparameterComponentsPage = new ReportparameterComponentsPage();
        expect(reportparameterComponentsPage.getTitle()).toMatch(/reportgatewayApp.reportparameter.home.title/);

    });

    it('should load create Reportparameter dialog', () => {
        reportparameterComponentsPage.clickOnCreateButton();
        reportparameterDialogPage = new ReportparameterDialogPage();
        expect(reportparameterDialogPage.getModalTitle()).toMatch(/reportgatewayApp.reportparameter.home.createOrEditLabel/);
        reportparameterDialogPage.close();
    });

    it('should create and save Reportparameters', () => {
        reportparameterComponentsPage.clickOnCreateButton();
        reportparameterDialogPage.setLabelInput('label');
        expect(reportparameterDialogPage.getLabelInput()).toMatch('label');
        reportparameterDialogPage.setInstructionsInput('instructions');
        expect(reportparameterDialogPage.getInstructionsInput()).toMatch('instructions');
        reportparameterDialogPage.setDatatypeInput('datatype');
        expect(reportparameterDialogPage.getDatatypeInput()).toMatch('datatype');
        reportparameterDialogPage.setRequiredInput('required');
        expect(reportparameterDialogPage.getRequiredInput()).toMatch('required');
        reportparameterDialogPage.setMinlengthInput('minlength');
        expect(reportparameterDialogPage.getMinlengthInput()).toMatch('minlength');
        reportparameterDialogPage.setMaxlengthInput('maxlength');
        expect(reportparameterDialogPage.getMaxlengthInput()).toMatch('maxlength');
        reportparameterDialogPage.setValidationInput('validation');
        expect(reportparameterDialogPage.getValidationInput()).toMatch('validation');
        reportparameterDialogPage.setStatusInput('status');
        expect(reportparameterDialogPage.getStatusInput()).toMatch('status');
        reportparameterDialogPage.setLastmodifiedbyInput('lastmodifiedby');
        expect(reportparameterDialogPage.getLastmodifiedbyInput()).toMatch('lastmodifiedby');
        reportparameterDialogPage.setLastmodifieddatetimeInput(12310020012301);
        expect(reportparameterDialogPage.getLastmodifieddatetimeInput()).toMatch('2001-12-31T02:30');
        reportparameterDialogPage.setDomainInput('domain');
        expect(reportparameterDialogPage.getDomainInput()).toMatch('domain');
        reportparameterDialogPage.reportSelectLastOption();
        reportparameterDialogPage.save();
        expect(reportparameterDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ReportparameterComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-reportparameter div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ReportparameterDialogPage {
    modalTitle = element(by.css('h4#myReportparameterLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    labelInput = element(by.css('input#field_label'));
    instructionsInput = element(by.css('input#field_instructions'));
    datatypeInput = element(by.css('input#field_datatype'));
    requiredInput = element(by.css('input#field_required'));
    minlengthInput = element(by.css('input#field_minlength'));
    maxlengthInput = element(by.css('input#field_maxlength'));
    validationInput = element(by.css('input#field_validation'));
    statusInput = element(by.css('input#field_status'));
    lastmodifiedbyInput = element(by.css('input#field_lastmodifiedby'));
    lastmodifieddatetimeInput = element(by.css('input#field_lastmodifieddatetime'));
    domainInput = element(by.css('input#field_domain'));
    reportSelect = element(by.css('select#field_report'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setLabelInput = function(label) {
        this.labelInput.sendKeys(label);
    }

    getLabelInput = function() {
        return this.labelInput.getAttribute('value');
    }

    setInstructionsInput = function(instructions) {
        this.instructionsInput.sendKeys(instructions);
    }

    getInstructionsInput = function() {
        return this.instructionsInput.getAttribute('value');
    }

    setDatatypeInput = function(datatype) {
        this.datatypeInput.sendKeys(datatype);
    }

    getDatatypeInput = function() {
        return this.datatypeInput.getAttribute('value');
    }

    setRequiredInput = function(required) {
        this.requiredInput.sendKeys(required);
    }

    getRequiredInput = function() {
        return this.requiredInput.getAttribute('value');
    }

    setMinlengthInput = function(minlength) {
        this.minlengthInput.sendKeys(minlength);
    }

    getMinlengthInput = function() {
        return this.minlengthInput.getAttribute('value');
    }

    setMaxlengthInput = function(maxlength) {
        this.maxlengthInput.sendKeys(maxlength);
    }

    getMaxlengthInput = function() {
        return this.maxlengthInput.getAttribute('value');
    }

    setValidationInput = function(validation) {
        this.validationInput.sendKeys(validation);
    }

    getValidationInput = function() {
        return this.validationInput.getAttribute('value');
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

    reportSelectLastOption = function() {
        this.reportSelect.all(by.tagName('option')).last().click();
    }

    reportSelectOption = function(option) {
        this.reportSelect.sendKeys(option);
    }

    getReportSelect = function() {
        return this.reportSelect;
    }

    getReportSelectedOption = function() {
        return this.reportSelect.element(by.css('option:checked')).getText();
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
