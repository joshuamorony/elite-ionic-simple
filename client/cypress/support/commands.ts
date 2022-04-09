// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import {
  getModuleListItems,
  getLessonListItems,
  getKeyInput,
  getLoginButton,
} from '../support/utils';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject> {
      navigateToHomePage(): typeof navigateToHomePage;
      navigateToLessonSelectPage(): typeof navigateToLessonSelectPage;
      navigateToLessonPage(): typeof navigateToLessonPage;
      navigateToLoginPage(): typeof navigateToLoginPage;
    }
  }
}

const navigateToLoginPage = () => {
  cy.visit('/');
};

const navigateToHomePage = () => {
  navigateToLoginPage();
  getKeyInput().type('abcd-efgh-ijkl-mnop');
  getLoginButton().click();
};

const navigateToLessonSelectPage = () => {
  navigateToHomePage();
  getModuleListItems().first().click();
};

const navigateToLessonPage = () => {
  navigateToLessonSelectPage();
  getLessonListItems().first().click();
};

Cypress.Commands.add('navigateToLoginPage', navigateToLoginPage);
Cypress.Commands.add('navigateToHomePage', navigateToHomePage);
Cypress.Commands.add('navigateToLessonSelectPage', navigateToLessonSelectPage);
Cypress.Commands.add('navigateToLessonPage', navigateToLessonPage);

export {};
