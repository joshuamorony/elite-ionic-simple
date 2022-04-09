import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';
import { Lesson } from '../interfaces/lesson';
import { ModulesService } from '../services/modules.service';

@Component({
  selector: 'app-lesson-select',
  templateUrl: './lesson-select.page.html',
  styleUrls: ['./lesson-select.page.scss'],
})
export class LessonSelectPage {
  module$ = this.route.paramMap.pipe(
    switchMap((params) =>
      this.modulesService.getModuleById(parseInt(params.get('id'), 10))
    )
  );

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private modulesService: ModulesService
  ) {}

  openLesson(lesson: Lesson) {
    const moduleId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.navCtrl.navigateForward(`/module/${moduleId}/lesson/${lesson.id}`);
  }
}
