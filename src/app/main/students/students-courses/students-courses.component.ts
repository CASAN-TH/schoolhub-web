import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { StudentsService } from '../students.service';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-students-courses',
  templateUrl: './students-courses.component.html',
  styleUrls: ['./students-courses.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
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
