import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { StudentsService } from '../students.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { Location } from '@angular/common';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from '../i18n/en';
import { locale as thai } from '../i18n/th';

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

  constructor(
    private studentsService: StudentsService,
    private _location: Location,
    private formBuilder: FormBuilder,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService) { this._fuseTranslationLoaderService.loadTranslations(english, thai); }

  ngOnInit() {
    this.studentsService.onCoursesDataChanged.subscribe((res: any) => {
      // console.log(res)
      this.course = res;
      if (!this.course) {
        this.course = {
          student_no: "",
          title: "",
          firstname: "",
          lastname: "",
          citizenid: "",
          birthday: "",
          birthmonth: "",
          birthyear: "",
          sex: "",
          nationality: "",
          religion: "",
          fathername: "",
          mothername: "",
          attendencedate: "",
          oldschool: "",
          oldprovince: "",
          lastclass: ""
        }
      }
      this.studentsForm = this.createCoursesForm();
    });
  }

  createCoursesForm(): FormGroup {
    return this.formBuilder.group({
      _id: [this.course._id],
      student_no: [this.course.student_no],
      title: [this.course.title],
      firstname: [this.course.firstname],
      lastname: [this.course.lastname],
      citizenid: [this.course.citizenid],
      birthday: [this.course.birthday],
      birthmonth: [this.course.birthmonth],
      birthyear: [this.course.birthyear],
      sex: [this.course.sex],
      nationality: [this.course.nationality],
      religion: [this.course.religion],
      fathername: [this.course.fathername],
      mothername: [this.course.mothername],
      attendencedate: [this.course.attendencedate],
      oldschool: [this.course.oldschool],
      oldprovince: [this.course.oldprovince],
      lastclass: [this.course.lastclass]
    });
  }

  goBack() {
    this._location.back();
  }

}
