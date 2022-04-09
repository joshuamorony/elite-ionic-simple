import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { ModulesService } from '../services/modules.service';

import { LessonPage } from './lesson.page';

describe('LessonPage', () => {
  let component: LessonPage;
  let fixture: ComponentFixture<LessonPage>;

  const testModule = {
    id: 1,
    title: 'test',
    description: 'test',
    lessons: [
      { id: 1, title: 'lesson1', content: 'hello' },
      { id: 2, title: 'lesson2', content: 'hello' },
      { id: 3, title: 'lesson3', content: 'hello' },
      { id: 4, title: 'lesson4', content: 'hello' },
    ],
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LessonPage],
      providers: [
        {
          provide: ModulesService,
          useValue: {
            getModuleById: jest.fn().mockReturnValue(of(testModule)),
            getLessonById: jest.fn().mockReturnValue(of(testModule.lessons[0])),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ moduleId: '1', lessonId: '1' })),
            snapshot: {
              paramMap: convertToParamMap({ moduleId: '1', lessonId: '1' }),
            },
          },
        },
      ],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(LessonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('lesson$ should be a stream of the lesson matching the id and module passed in', () => {
    const modulesService: any =
      fixture.debugElement.injector.get(ModulesService);

    const observerSpy = subscribeSpyTo(component.lesson$);

    expect(modulesService.getLessonById).toHaveBeenCalledWith(1, 1);
    expect(observerSpy.getLastValue()).toEqual(
      testModule.lessons.find((lesson) => lesson.id === 1)
    );
  });
});
