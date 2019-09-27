import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { StudentsService } from '../students.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  titles: Array<any> = [
    { value: 'เด็กชาย', viewValue: 'เด็กชาย' },
    { value: 'เด็กหญิง', viewValue: 'เด็กหญิง' },
    { value: 'นาย', viewValue: 'นาย' },
    { value: 'นางสาว', viewValue: 'นางสาว' }
  ];

  sexs: Array<any> = [
    { value: 'ชาย', viewValue: 'ชาย' },
    { value: 'หญิง', viewValue: 'หญิง' }
  ];

  birthdays: Array<any> = [
    { value: '01', viewValue: '01' },
    { value: '02', viewValue: '02' },
    { value: '03', viewValue: '03' },
    { value: '04', viewValue: '04' },
    { value: '05', viewValue: '05' },
    { value: '06', viewValue: '06' },
    { value: '07', viewValue: '07' },
    { value: '08', viewValue: '08' },
    { value: '09', viewValue: '09' },
    { value: '10', viewValue: '10' },
    { value: '11', viewValue: '11' },
    { value: '12', viewValue: '12' },
    { value: '13', viewValue: '13' },
    { value: '14', viewValue: '14' },
    { value: '15', viewValue: '15' },
    { value: '16', viewValue: '16' },
    { value: '17', viewValue: '17' },
    { value: '18', viewValue: '18' },
    { value: '19', viewValue: '19' },
    { value: '20', viewValue: '20' },
    { value: '21', viewValue: '21' },
    { value: '22', viewValue: '22' },
    { value: '23', viewValue: '23' },
    { value: '24', viewValue: '24' },
    { value: '25', viewValue: '25' },
    { value: '26', viewValue: '26' },
    { value: '27', viewValue: '27' },
    { value: '28', viewValue: '28' },
    { value: '29', viewValue: '29' },
    { value: '30', viewValue: '30' },
    { value: '31', viewValue: '31' }
  ];

  birthmonths: Array<any> = [
    { value: 'มกราคม', viewValue: 'มกราคม' },
    { value: 'กุมภาพันธ์', viewValue: 'กุมภาพันธ์' },
    { value: 'มีนาคม', viewValue: 'มีนาคม' },
    { value: 'เมษายน', viewValue: 'เมษายน' },
    { value: 'พฤษภาคม', viewValue: 'พฤษภาคม' },
    { value: 'มิถุนายน', viewValue: 'มิถุนายน' },
    { value: 'กรกฎาคม', viewValue: 'กรกฎาคม' },
    { value: 'สิงหาคม', viewValue: 'สิงหาคม' },
    { value: 'กันยายน', viewValue: 'กันยายน' },
    { value: 'ตุลาคม', viewValue: 'ตุลาคม' },
    { value: 'พฤศจิกายน', viewValue: 'พฤศจิกายน' },
    { value: 'ธันวาคม', viewValue: 'ธันวาคม' }
  ];


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
      student_no: [this.course.student_no, Validators.required],
      title: [this.course.title, Validators.required],
      firstname: [this.course.firstname, Validators.required],
      lastname: [this.course.lastname, Validators.required],
      citizenid: [this.course.citizenid, [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(13),
        Validators.maxLength(13)
      ]],
      birthday: [this.course.birthday, Validators.required],
      birthmonth: [this.course.birthmonth, Validators.required],
      birthyear: [this.course.birthyear, Validators.required],
      sex: [this.course.sex, Validators.required],
      nationality: [this.course.nationality, Validators.required],
      religion: [this.course.religion, Validators.required],
      fathername: [this.course.fathername, Validators.required],
      mothername: [this.course.mothername, Validators.required],
      attendencedate: [this.course.attendencedate, Validators.required],
      oldschool: [this.course.oldschool, Validators.required],
      oldprovince: [this.course.oldprovince, Validators.required],
      lastclass: [this.course.lastclass, Validators.required]
    });
  }

  goBack() {
    this._location.back();
  }

  onClose() {
    this._location.back();
  }

  onADDStudent() {
    console.log("onADDStudent");
  }

}
