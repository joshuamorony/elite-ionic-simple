import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ModulesService } from '../services/modules.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.page.html',
  styleUrls: ['./lesson.page.scss'],
})
export class LessonPage {
  lesson$ = this.route.paramMap.pipe(
    switchMap((params) =>
      this.modulesService.getLessonById(
        parseInt(params.get('moduleId'), 10),
        parseInt(params.get('lessonId'), 10)
      )
    )
  );

  constructor(
    private route: ActivatedRoute,
    private modulesService: ModulesService
  ) {}
}
