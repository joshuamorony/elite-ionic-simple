import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ModulesService } from '../services/modules.service';

import { HomePage } from './home.page';

jest.mock('../services/auth.service');
jest.mock('../services/modules.service');

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      providers: [
        AuthService,
        ModulesService,
        {
          provide: NavController,
          useValue: {
            navigateForward: jest.fn(),
          },
        },
      ],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign result of getModules to modules class member', () => {
    const moduleService = fixture.debugElement.injector.get(ModulesService);

    const dummyModule = {
      id: 0,
      title: '',
      description: '',
      lessons: [],
    };

    jest
      .spyOn(moduleService, 'getModules')
      .mockReturnValue(new Array(5).fill(dummyModule));

    component.ngOnInit();

    expect(component.modules.length).toBe(5);
  });

  it('openModule() should navigate to the LessonListPage', () => {
    const navCtrl = fixture.debugElement.injector.get(NavController);
    const testModule = { title: 'pretend module', id: 1 };

    component.openModule(testModule.id);

    expect(navCtrl.navigateForward).toHaveBeenCalledWith(
      '/module/' + testModule.id
    );
  });

  it('the logout function should call the logout method of the auth provider', () => {
    const authService = fixture.debugElement.injector.get(AuthService);

    component.logout();

    expect(authService.logout).toHaveBeenCalled();
  });
});
