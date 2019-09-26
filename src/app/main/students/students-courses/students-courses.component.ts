import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-students-courses',
  templateUrl: './students-courses.component.html',
  styleUrls: ['./students-courses.component.scss']
})
export class StudentsCoursesComponent implements OnInit {

  studentsForm: FormGroup;
  course: any;

  constructor(private studentsService: StudentsService, ) { }

  ngOnInit() {
    // this.studentsService.onCoursesDataChanged.subscribe((res: any) => {
    //   console.log(res)
    //   this.course = res;
      
    // })
  }

}
