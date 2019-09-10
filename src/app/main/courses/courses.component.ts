import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as thai } from './i18n/th';
import { CoursesService } from './courses.service';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CoursesComponent implements OnInit {
  courses: any;

  constructor(
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private CoursesService: CoursesService,
    private _router: Router
  ) {
    this._fuseTranslationLoaderService.loadTranslations(english, thai);
  }


  ngOnInit(): void {
    this.CoursesService.onCoursesChanged.subscribe((res: any) => {

      var groups = res.reduce(function (obj, item) {
        obj[item.years] = obj[item.year] || [];
        obj[item.years].push(item.year);
        return obj;
      }, {});
      var myArray = Object.keys(groups).map(function (key) {
        return { year: groups[key] };
      });
      this.courses = myArray;
    })
  }

  newCourse(Actiontype){
    this._router.navigate(['/courses/courseslist/' + Actiontype + '/' + '2563']);
  }
}
