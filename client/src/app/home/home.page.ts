import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Module } from '../interfaces/module';
import { AuthService } from '../services/auth.service';
import { ModulesService } from '../services/modules.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  modules: Module[] = [];

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private modulesService: ModulesService
  ) {}

  ngOnInit(): void {
    this.modules = this.modulesService.getModules();
  }

  openModule(id: number) {
    this.navCtrl.navigateForward('/module/' + id);
  }

  logout() {
    this.authService.logout();
  }
}
