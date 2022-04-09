import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Lesson } from '../interfaces/lesson';
import { Module } from '../interfaces/module';

@Injectable({
  providedIn: 'root',
})
export class ModulesService {
  constructor() {}

  public getModuleById(id: number): Observable<Module> {
    return of(this.getModules().find((courseModule) => courseModule.id === id));
  }

  public getLessonById(moduleId: number, lessonId: number): Observable<Lesson> {
    const moduleWithLesson = this.getModules().find(
      (courseModule) => courseModule.id === moduleId
    );

    return of(
      moduleWithLesson.lessons.find((lesson) => lesson.id === lessonId)
    );
  }

  getModules(): Module[] {
    const modules = [
      {
        id: 1,
        title: 'Module One',
        description: 'Test',
        lessons: [
          { id: 1, title: 'lesson1', content: 'this is the lesson content' },
          { id: 2, title: 'lesson2', content: 'this is the lesson content' },
        ],
      },
      {
        id: 2,
        title: 'Module Two',
        description: 'Test',
        lessons: [
          { id: 1, title: 'lesson1', content: 'this is the lesson content' },
          { id: 2, title: 'lesson2', content: 'this is the lesson content' },
        ],
      },
      {
        id: 3,
        title: 'Module Three',
        description: 'Test',
        lessons: [
          { id: 1, title: 'lesson1', content: 'this is the lesson content' },
          { id: 2, title: 'lesson2', content: 'this is the lesson content' },
        ],
      },
      {
        id: 4,
        title: 'Module Four',
        description: 'Test',
        lessons: [
          { id: 1, title: 'lesson1', content: 'this is the lesson content' },
          { id: 2, title: 'lesson2', content: 'this is the lesson content' },
        ],
      },
      {
        id: 5,
        title: 'Module Five',
        description: 'Test',
        lessons: [
          { id: 1, title: 'lesson1', content: 'this is the lesson content' },
          { id: 2, title: 'lesson2', content: 'this is the lesson content' },
        ],
      },
    ];

    return modules;
  }
}
