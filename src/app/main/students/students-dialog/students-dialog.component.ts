import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { StudentsService } from '../students.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-students-dialog',
  templateUrl: './students-dialog.component.html',
  styleUrls: ['./students-dialog.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class StudentsDialogComponent implements OnInit {

  students: any = [];
  studentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _location: Location,
    private studentsService: StudentsService,
    public matDialogRef: MatDialogRef<StudentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any
  ) {
    if (this.students) {
      this.students = _data.student;
      console.log(this.students);
    }
    this.studentForm = this.createStudentsForm();
  }

  ngOnInit() {

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
    this.matDialogRef.close();
  }

  // onsoldoutSave() {
  //   // console.log(students);
  //   this.studentsService.studentsSoldoutData(this.studentForm.getRawValue()).then(value => {
  //     this._location.back();
  //   });
  // }

}
