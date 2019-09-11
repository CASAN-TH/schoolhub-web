import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-subjectdialog',
  templateUrl: './subjectdialog.component.html',
  styleUrls: ['./subjectdialog.component.scss']
})
export class SubjectdialogComponent implements OnInit {
  types: any;

  subjectForm: FormGroup;
  Actiontype: any;
  structure: any;
  structure1: any;
  constructor(
    public dialogRef: MatDialogRef<SubjectdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.Actiontype = this.data;

    if(this.Actiontype.actiontype === "new"){
      this.subjectForm = this.formBuilder.group({
        code: ['', Validators.required],
        subject: ['', Validators.required],
        course_type: ['', Validators.required],
        hours: ['', Validators.required],
        weight: ['', Validators.required]
      });
    }else{
      this.subjectForm = this.formBuilder.group({
        _id: [this.Actiontype.data._id, Validators.required],
        seq: [this.Actiontype.data.seq, Validators.required],
        code: [this.Actiontype.data.code, Validators.required],
        subject: [this.Actiontype.data.subject, Validators.required],
        course_type: [this.Actiontype.data.course_type, Validators.required],
        hours: [this.Actiontype.data.hours, Validators.required],
        weight: [this.Actiontype.data.weight, Validators.required]
      });
    }

  }
  onclose(){
    this.dialogRef.close();
  }
  oncloseAdd(){
    this.structure = this.subjectForm.getRawValue();
    // let structure ={
    //   _id: this.structure._id =[{
    //     code: this.structure.code,
    //     subject: this.structure.subject,
    //     type: this.structure.type,
    //     hours: this.structure.hours
    //   }]
    // }
    this.dialogRef.close(this.structure);
  }

}
export interface type {
  value: string;
  viewValue: string;
}

export interface DialogData {
  animal: string;
  name: string;
}