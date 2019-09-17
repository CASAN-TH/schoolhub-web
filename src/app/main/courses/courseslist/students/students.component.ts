import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../courses.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  coursegrade: any;
  students: Array<any>;

  displayedColumns = ['seq', 'student_no', 'name', 'citizenid', 'buttons'];

  constructor(
    private CourseService: CoursesService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.CourseService.onCourseChanged.subscribe((res: any) => {
      this.coursegrade = res.filter(course => course.grade === this.CourseService.routeParams.grade);
      this.coursegrade.forEach(element => {
        this.students = element.students;
      });
    })
  }

  EvaluationStudent(student) {
    this.coursegrade.forEach(element => {
      this.router.navigate(['/courses/students/transcript/' + element._id + '/' + student.student_id])
    });
  }


  onAdstudents() {
    this.router.navigate(['/students/new']);
  }
}
