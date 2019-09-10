import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.scss']
})
export class StudentsFormComponent implements OnInit {

  studentsForm: FormGroup;
  students: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    private formBuilder: FormBuilder, ) { }

  ngOnInit() {
    this.studentsForm = this.formBuilder.group({
      room: ['', Validators.required],
      studentnumber: ['', Validators.required],
      studentid: ['', Validators.required],
      prefix: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      identificationnumber: ['', Validators.required],
      attendancedate: ['', Validators.required],
      oldschool: ['', Validators.required],
      province: ['', Validators.required],
      lastfloor: ['', Validators.required],
      birthday: ['', Validators.required],
      sex: ['', Validators.required],
      nationality: ['', Validators.required],
      religion: ['', Validators.required],
      fatherfullname: ['', Validators.required],
      motherfullname: ['', Validators.required],
      phonenumber: ['', Validators.required],
      pp1set: ['', Validators.required],
      pp1number: ['', Validators.required],
      pp2number: ['', Validators.required],
      enddateofapproval: ['', Validators.required],
      approvaldate: ['', Validators.required],
      cause: ['', Validators.required]
    });

    this.studentsService.onDataChanged.subscribe((res: any) => {
      this.students = res;
      // console.log(this.students);
      if (!this.students) {
        this.students = {
          room: "",
          studentnumber: "",
          studentid: "",
          prefix: "",
          firstname: "",
          lastname: "",
          identificationnumber: "",
          attendancedate: "",
          oldschool: "",
          province: "",
          lastfloor: "",
          birthday: "",
          sex: "",
          nationality: "",
          religion: "",
          fatherfullname: "",
          motherfullname: "",
          phonenumber: "",
          pp1set: "",
          pp1number: "",
          pp2number: "",
          enddateofapproval: "",
          approvaldate: "",
          cause: ""
        }
      }
      this.studentsForm = this.createStudentsForm();
    });
  }
  createStudentsForm(): FormGroup {
    return this.formBuilder.group({
      _id: [this.students._id],
      room: [this.students.room],
      studentnumber: [this.students.studentnumber],
      studentid: [this.students.studentid],
      prefix: [this.students.prefix],
      firstname: [this.students.firstname],
      lastname: [this.students.lastname],
      identificationnumber: [this.students.identificationnumber],
      attendancedate: [this.students.attendancedate],
      oldschool: [this.students.oldschool],
      province: [this.students.province],
      lastfloor: [this.students.lastfloor],
      birthday: [this.students.birthday],
      sex: [this.students.sex],
      nationality: [this.students.nationality],
      religion: [this.students.religion],
      fatherfullname: [this.students.fatherfullname],
      motherfullname: [this.students.motherfullname],
      phonenumber: [this.students.phonenumber],
      pp1set: [this.students.pp1set],
      pp1number: [this.students.pp1number],
      pp2number: [this.students.pp2number],
      enddateofapproval: [this.students.enddateofapproval],
      approvaldate: [this.students.approvaldate],
      cause: [this.students.cause]
    });

  }
  onAddNew() {
    // console.log("onAddNew");
    this.studentsService.adStudentsData(this.studentsForm.getRawValue());
    this.router.navigate(['students']);
  }

  onsaveEdit() {
    console.log("onsaveEdit");
    this.studentsService.editStudentsData(this.studentsForm.getRawValue());
    this.router.navigate(['students']);
  }

  oncloseAdd() {
    this.router.navigate(['students']);
  }

  onclpseEdit() {
    this.router.navigate(['students']);
  }
}
