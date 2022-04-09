import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public storage: Storage = localStorage;

  constructor(private http: HttpClient, private navCtrl: NavController) {}

  async reauthenticate(): Promise<void> {
    const key = this.storage.getItem('eliteLicenseKey');

    if (!key) {
      throw new Error('No key found');
    }

    this.checkKey(key).subscribe((res) => {
      if (!res) {
        throw new Error('Invalid key');
      }
    });
  }

  checkKey(key: string): Observable<any> {
    this.storage.setItem('eliteLicenseKey', key);

    const body = { key };

    return this.http.post('http://localhost:8080/api/check', body);
  }

  async logout(): Promise<boolean> {
    this.storage.removeItem('eliteLicenseKey');
    return this.navCtrl.navigateRoot('/login');
  }
}
