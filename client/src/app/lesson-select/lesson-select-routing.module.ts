import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LessonSelectPage } from './lesson-select.page';

const routes: Routes = [
  {
    path: '',
    component: LessonSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonSelectPageRoutingModule {}
