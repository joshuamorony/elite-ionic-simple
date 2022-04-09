import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { NavController } from '@ionic/angular';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let navCtrl: NavController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: NavController,
          useValue: {
            navigateRoot: jest.fn(),
          },
        },
      ],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    navCtrl = TestBed.inject(NavController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('checkKey should make a call to the server to check the validity of a key', () => {
    const key = 'ewu0fef0ewuf08j3892jf98';
    const mockResponse = '{"isValid": true}';

    service.checkKey(key).subscribe((result: any) => {
      expect(result).toEqual(mockResponse);
    });

    // Expect a request to the URL
    const mockReq = httpMock.expectOne('http://localhost:8080/api/check');

    // Execute the request using the mockResponse data
    mockReq.flush(mockResponse);
  });

  it('reauthenticate should automatically check key if in storage', fakeAsync(() => {
    const mockResponse = '{"isValid": true}';

    jest.spyOn(service.storage, 'getItem').mockReturnValue('abcde-fghi-jklm');

    service.reauthenticate();

    tick();

    // Expect a request to the URL
    const mockReq = httpMock.expectOne('http://localhost:8080/api/check');

    // Execute the request using the mockResponse data
    mockReq.flush(mockResponse);
  }));

  it('checkKey should save the key being checked to storage', fakeAsync(() => {
    const key = 'ewu0fef0ewuf08j3892jf98';
    const mockResponse = '{"isValid": true}';

    jest.spyOn(service.storage, 'setItem');

    service.checkKey(key).subscribe((result: any) => {
      expect(result).toEqual(mockResponse);
    });

    // Expect a request to the URL
    const mockReq = httpMock.expectOne('http://localhost:8080/api/check');

    // Execute the request using the mockResponse data
    mockReq.flush(mockResponse);

    expect(service.storage.setItem).toHaveBeenCalledWith(
      'eliteLicenseKey',
      'ewu0fef0ewuf08j3892jf98'
    );
  }));

  it('the logout function should set the root page to the Login Page', fakeAsync(() => {
    jest.spyOn(service.storage, 'setItem');
    jest.spyOn(navCtrl, 'navigateRoot');

    service.logout();

    tick();

    expect(navCtrl.navigateRoot).toHaveBeenCalledWith('/login');
  }));

  it('the logout function should clear the key in storage', fakeAsync(() => {
    jest.spyOn(service.storage, 'removeItem');

    service.logout();

    tick();

    expect(service.storage.removeItem).toHaveBeenCalledWith('eliteLicenseKey');
  }));
});
