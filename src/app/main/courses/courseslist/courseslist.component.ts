import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CoursesService } from '../courses.service';
import { takeUntil } from 'rxjs/operators';
import { Subject, from } from 'rxjs';
import { Location } from '@angular/common'
@Component({
  selector: 'app-courseslist',
  templateUrl: './courseslist.component.html',
  styleUrls: ['./courseslist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CourseslistComponent implements OnInit {
  level1: Array <any>;
  level2: Array <any>;
  level3: Array <any>;

  courses:any;
  order: string = 'seq';

  constructor(
    private CoursesService: CoursesService,
    private _location: Location
  ) {
   }

  ngOnInit() {
    this.CoursesService.onCourseChanged
    .subscribe((res :any) =>{
      this.courses = res;
      this.level1 = res.filter(course => course.grade > 0 && course.grade <= 6);
      this.level2 = res.filter(course => course.grade > 6 && course.grade <= 9);
      this.level3 = res.filter(course => course.grade > 9);
    })
  }

  goBack(){
    this._location.back();
  }
}
