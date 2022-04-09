import {
  getKeyInput,
  getLoginButton,
  getModuleListItems,
} from '../support/utils';

describe('Login', () => {
  beforeEach(() => {
    cy.navigateToLoginPage();
  });

  it('a user should be able to reach the home page by providing a valid license key', () => {
    getKeyInput().type('abcd-egfh-ijkl-mnop');
    getLoginButton().click();

    getModuleListItems().first().should('contain.text', 'Module One');
  });

  it('should take the user directly to the home page if they have logged in previously', () => {
    getKeyInput().type('abcd-egfh-ijkl-mnop');
    getLoginButton().click();

    cy.visit('/');

    getModuleListItems().first().should('contain.text', 'Module One');
  });
});
