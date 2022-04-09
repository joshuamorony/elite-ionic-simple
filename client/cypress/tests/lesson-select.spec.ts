import { getLessonListItems, getLessonContent } from '../support/utils';

describe('Lesson Select', () => {
  beforeEach(() => {
    cy.navigateToLessonSelectPage();
  });

  it('the list of lessons should contain the titles of the lessons', () => {
    getLessonListItems().first().should('contain.text', 'lesson1');
  });

  it('after selecting a specific lesson, the user should be able to see content for that lesson', () => {
    getLessonListItems().first().click();
    getLessonContent().should('contain.text', 'this is the lesson content');
  });
});
