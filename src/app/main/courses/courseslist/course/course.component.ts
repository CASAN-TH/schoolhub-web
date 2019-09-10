import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from '../../courses.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  @Input()
  list:any;

  course: any;
  displayedColumns: string[] = ['numbers', 'id', 'name', 'type','time','weight'];
  dataSource: any;
  
  constructor(
    private route: Router,
    private CoursesService: CoursesService
  ) { }

  ngOnInit() {
    this.CoursesService.onCourseChanged
    .subscribe((res: any)=>{
      this.course = res;
      console.log(this.course)
    })
    this.dataSource = this.list.structures;
  }

  addPerson(){
    this.route.navigate(['courses/students/' + this.list.year + '/' + '1'])
  }
}
