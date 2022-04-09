import {
  getKeyInput,
  getLessonListItems,
  getLogoutButton,
  getModuleListItems,
} from '../support/utils';

describe('Home', () => {
  beforeEach(() => {
    cy.navigateToHomePage();
  });

  it('should be able to view a list of modules', () => {
    getModuleListItems().should('have.length', 5);
  });

  it('the list of modules should contain the titles of the modules', () => {
    getModuleListItems().first().should('contain.text', 'Module One');
  });

  it('after selecting a specific module, the user should be able to see a list of available lessons', () => {
    getModuleListItems().first().click();
    getLessonListItems().should('have.length.greaterThan', 0);
  });

  it('should be able to log out', () => {
    getLogoutButton().click();
    getKeyInput().should('exist');
  });
});
