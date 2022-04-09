import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LessonSelectPageRoutingModule } from './lesson-select-routing.module';

import { LessonSelectPage } from './lesson-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LessonSelectPageRoutingModule
  ],
  declarations: [LessonSelectPage]
})
export class LessonSelectPageModule {}
