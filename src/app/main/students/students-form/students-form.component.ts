import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../students.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from '../i18n/en';
import { locale as thai } from '../i18n/th';

import { Location } from '@angular/common';
import { fuseAnimations } from '@fuse/animations';
@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class StudentsFormComponent implements OnInit {

  studentsForm: FormGroup;
  students: any = [];
  class: Array<any> = [
    { value: 'p1', viewValue: 'ประถมศึกษาปีที่ 1' },
    { value: 'p2', viewValue: 'ประถมศึกษาปีที่ 2' },
    { value: 'p3', viewValue: 'ประถมศึกษาปีที่ 3' }
  ];

  prefixs: Array<any> = [
    { value: 'เด็กชาย', viewValue: 'เด็กชาย' },
    { value: 'เด็กหญิง', viewValue: 'เด็กหญิง' },
    { value: 'นาย', viewValue: 'นาย' },
    { value: 'นางสาว', viewValue: 'นางสาว' }
  ];

  sexs: Array<any> = [
    { value: 'ชาย', viewValue: 'ชาย' },
    { value: 'หญิง', viewValue: 'หญิง' }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    private formBuilder: FormBuilder,
    private _location: Location,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService) {
    this._fuseTranslationLoaderService.loadTranslations(english, thai);
  }

  ngOnInit() {

    this.studentsService.onDataChanged.subscribe((res: any) => {
      this.students = res;
      // console.log(this.students);
      if (!this.students) {
        this.students = {
          class: "",
          room: "",
          studentid: "",
          prefix: "",
          firstname: "",
          lastname: "",
          identificationnumber: "",
          birthday: "",
          sex: "",
          fatherfullname: "",
          motherfullname: "",
          phonenumber: "",
        }
      }
      this.studentsForm = this.createStudentsForm();
    });
  }
  createStudentsForm(): FormGroup {
    return this.formBuilder.group({
      _id: [this.students._id],
      class: [this.students.class, Validators.required],
      room: [this.students.room],
      studentid: [this.students.studentid, Validators.required],
      prefix: [this.students.prefix, Validators.required],
      firstname: [this.students.firstname, Validators.required],
      lastname: [this.students.lastname, Validators.required],
      identificationnumber: [this.students.identificationnumber, Validators.required],
      birthday: [this.students.birthday, Validators.required],
      sex: [this.students.sex, Validators.required],
      fatherfullname: [this.students.fatherfullname, Validators.required],
      motherfullname: [this.students.motherfullname, Validators.required],
      phonenumber: [this.students.phonenumber, Validators.required],

    });

  }
  onAddNew() {
    // console.log("onAddNew");
    this.studentsService.adStudentsData(this.studentsForm.getRawValue()).then(value => {
      //this.router.navigate(['students']);
      this._location.back();
    });


  }

  onsaveEdit() {
    console.log("onsaveEdit");
    this.studentsService.editStudentsData(this.studentsForm.getRawValue()).then(value => {
      // this.router.navigate(['students']);
      this._location.back();
    });

  }

  onClose() {
    //this.router.navigate(['students']);
    this._location.back();
  }

  goBack() {
    this._location.back();
  }


}
