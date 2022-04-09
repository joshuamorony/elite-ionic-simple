export const getModuleListItems = () =>
  cy.get('[data-test="module-list-item"]');

export const getLessonListItems = () =>
  cy.get('[data-test="lesson-list-item"]');

export const getLessonContent = () => cy.get('[data-test="lesson-content"]');

export const getKeyInput = () => cy.get('[data-test="key-input"] input');

export const getLoginButton = () => cy.get('[data-test="login-button"]');

export const getLogoutButton = () => cy.get('[data-test="logout-button"]');
