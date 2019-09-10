import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as thai } from './i18n/th';
import { CoursesService } from './courses.service';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { NavigationEnd, Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CoursesComponent implements OnInit {
  courses: any;
  yearmax = 0;
  constructor(
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private CoursesService: CoursesService,
    private _router: Router
  ) {
    this._fuseTranslationLoaderService.loadTranslations(english, thai);
  }


  ngOnInit(): void {
    this.CoursesService.onCoursesChanged.subscribe((res: any) => {
      var result=_.chain(res).groupBy("year").map(function(v, i) {
        return {
          year: i,
        }
      }).value();

      result.forEach((item:any)=>{
        if(item.year > this.yearmax){
          this.yearmax =  parseInt(item.year);
        }
      });
      this.courses = result; 
    })
  }

  newCourse(Actiontype){
    this._router.navigate(['/courses/courseslist/' + Actiontype + '/' + (this.yearmax + 1)]);
  }
}
