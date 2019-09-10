import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-courseslist',
  templateUrl: './courseslist.component.html',
  styleUrls: ['./courseslist.component.scss']
})
export class CourseslistComponent implements OnInit {
  courses: any;
  constructor(
    private CoursesService: CoursesService
  ) { }

  ngOnInit() {
    this.CoursesService.onCoursesChanged.subscribe((res :any) =>{
      this.courses = res;
    })
  }

}
