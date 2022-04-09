import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

import { ModulesService } from './modules.service';

describe('ModulesService', () => {
  let service: ModulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getModules should return a non-empty array', () => {
    const result = service.getModules();
    expect(result.length).toBeGreaterThan(0);
  });

  it('getModuleById should return a module when given a module id', () => {
    const testId = 1;
    const testModule$ = service.getModuleById(testId);

    const observerSpy = subscribeSpyTo(testModule$);

    expect(observerSpy.getLastValue().title).toBe('Module One');
  });

  it('getLessonById should return a lesson when given a module id and lesson id', () => {
    const testModuleId = 1;
    const testLessonId = 2;

    const testLesson$ = service.getLessonById(testModuleId, testLessonId);
    const observerSpy = subscribeSpyTo(testLesson$);

    expect(observerSpy.getLastValue().title).toBe('lesson2');
  });
});
