import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as thai } from './i18n/th';
import { CoursesService } from './courses.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  course: any;

  constructor(
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private CoursesService : CoursesService
  ) {
    this._fuseTranslationLoaderService.loadTranslations(english, thai);
  }


  ngOnInit(): void {
    this.CoursesService.onCoursesChanged.subscribe((res: any) =>{
      console.log(res);
    })
  }

}
