import {
  ComponentFixture,
  TestBed,
  waitForAsync,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController, NavController } from '@ionic/angular';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';

import { LoginPage } from './login.page';

jest.mock('../services/auth.service');

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [
        AuthService,
        {
          provide: LoadingController,
          useFactory: jest.fn().mockImplementation(() => ({
            create: jest.fn().mockImplementation(
              () =>
                Promise.resolve({
                  present: jest.fn().mockResolvedValue(true),
                  dismiss: jest.fn().mockResolvedValue(true),
                }) as any
            ),
          })),
        },
        {
          provide: NavController,
          useValue: {
            navigateRoot: jest.fn(),
          },
        },
      ],
      imports: [IonicModule.forRoot(), FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a loading overlay whilst an authentication request is being made', fakeAsync(() => {
    const authService = fixture.debugElement.injector.get(AuthService);
    const loadingCtrl = fixture.debugElement.injector.get(LoadingController);

    let spiedObject;

    jest.spyOn(loadingCtrl, 'create').mockImplementation(() => {
      spiedObject = {
        present: jest.fn().mockResolvedValue(true),
        dismiss: jest.fn().mockResolvedValue(true),
      };

      return Promise.resolve(spiedObject);
    });

    const authResponse = {
      isValid: true,
    };

    jest.spyOn(authService, 'checkKey').mockReturnValue(of(authResponse));

    component.licenseKey = 'abcde-fghi';

    component.login();

    tick();

    expect(spiedObject.present).toHaveBeenCalled();
  }));

  it('should dismiss the loading overlay after getting a response from the server', fakeAsync(() => {
    const authService = fixture.debugElement.injector.get(AuthService);
    const loadingCtrl = fixture.debugElement.injector.get(LoadingController);

    let spiedObject;

    jest.spyOn(loadingCtrl, 'create').mockImplementation(() => {
      spiedObject = {
        present: jest.fn().mockResolvedValue(true),
        dismiss: jest.fn().mockResolvedValue(true),
      };

      return Promise.resolve(spiedObject);
    });

    const authResponse = {
      isValid: true,
    };

    jest.spyOn(authService, 'checkKey').mockReturnValue(of(authResponse));

    component.licenseKey = 'abcde-fghi';

    component.login();

    tick();

    expect(spiedObject.dismiss).toHaveBeenCalled();
  }));

  it('after a successful login, the root page should be changed to HomePage', fakeAsync(() => {
    const navCtrl = fixture.debugElement.injector.get(NavController);
    const authService = fixture.debugElement.injector.get(AuthService);

    const authResponse = {
      isValid: true,
    };

    jest.spyOn(authService, 'checkKey').mockReturnValue(of(authResponse));

    component.licenseKey = 'abcde-fghi';

    component.login();

    tick();

    expect(navCtrl.navigateRoot).toHaveBeenCalledWith('/home');
  }));

  it('if the user has a valid license key in storage then they should be taken straight to the home page', fakeAsync(() => {
    const authProvider = fixture.debugElement.injector.get(AuthService);
    const navCtrl = fixture.debugElement.injector.get(NavController);

    jest
      .spyOn(authProvider, 'reauthenticate')
      .mockReturnValue(new Promise((resolve) => setTimeout(resolve, 0)));

    component.ngOnInit();

    tick();

    expect(navCtrl.navigateRoot).toHaveBeenCalledWith('/home');
  }));
});
