import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CoursesService } from '../../courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { Location } from '@angular/common'
import { environment } from 'environments/environment.hmr';

import { locale as english } from '../../i18n/en';
import { locale as thai } from '../../i18n/th';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class StudentsComponent implements OnInit {
  coursegrade: any;
  students: any = [];

  displayedColumns = ['seq', 'student_no', 'name', 'citizenid', 'buttons'];

  constructor(
    private CourseService: CoursesService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService
  ) {
    this._fuseTranslationLoaderService.loadTranslations(english, thai);
  }

  ngOnInit() {
    this.CourseService.onCourseChanged.subscribe((res: any) => {
      this.coursegrade = res.filter(course => course.grade === this.CourseService.routeParams.grade);
      this.coursegrade.forEach(element => {
        this.students = element.students;
      });
      console.log(this.students);
    })
  }

  EvaluationStudent(student) {
    this.coursegrade.forEach(element => {
      this.router.navigate(['/courses/students/transcript/' + element._id + '/' + student.student_id])
    });
  }


  onAdstudents() {
    // console.log("ssfgrgfs");
    this.router.navigate(['/students/' + this.coursegrade[0]._id + '/new']);
  }

  goBack() {
    this._location.back();
  }

  printpp1(students) {
    window.open(environment.apiUrl + '/api/course/pp1/' + students.student_id)
  }
}
