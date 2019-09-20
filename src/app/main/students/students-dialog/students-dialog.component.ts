import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { StudentsService } from '../students.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-students-dialog',
  templateUrl: './students-dialog.component.html',
  styleUrls: ['./students-dialog.component.scss']
})
export class StudentsDialogComponent implements OnInit {

  students: any = [];
  studentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _location: Location,
    private studentsService: StudentsService,
    @Inject(MAT_DIALOG_DATA) private _data: any
  ) {
    if (this.students) {
      this.students = _data.student;
      console.log(this.students);
    }
    this.studentForm = this.createStudentsForm();
  }

  ngOnInit() {
    // this.studentsService.onDataChanged.subscribe((res: any) => {
    //   console.log(res);
    //   this.students = res;
    //   console.log(this.students);
    //   // if (!this.students) {
    //   //   this.students = {
    //   //     cause: '',
    //   //     enddateofapproval: ''
    //   //   }
    //   // }
    // });


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
      identificationnumber: [this.students.identificationnumber,
      [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(13),
        Validators.maxLength(13)
      ]
      ],
      birthday: [this.students.birthday, Validators.required],
      sex: [this.students.sex, Validators.required],
      fatherfullname: [this.students.fatherfullname, Validators.required],
      motherfullname: [this.students.motherfullname, Validators.required],
      phonenumber: [this.students.phonenumber,
      [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10),
        Validators.maxLength(10)
      ]
      ],
      cause: [this.students.cause, Validators.required],
      enddateofapproval: [this.students.enddateofapproval, Validators.required]
    });
  }

  goBack() {
    this._location.back();
  }

  onsoldoutClose() {
    this._location.back();
  }

  onsoldoutSave() {
    // console.log(students);
    this.studentsService.studentsSoldoutData(this.studentForm.getRawValue()).then(value => {
      this._location.back();
    });
  }

}