import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdmissionsService } from '../admissions.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { locale as english } from '../i18n/en';
import { locale as thai } from '../i18n/th';
import { DateAdapter } from '@angular/material';

import { Location } from '@angular/common';
import { fuseAnimations } from '@fuse/animations';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

@Component({
  selector: 'app-admissions-form',
  templateUrl: './admissions-form.component.html',
  styleUrls: ['./admissions-form.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class AdmissionsFormComponent implements OnInit {

  admissionsForm: FormGroup;
  admissions: any = [];

  class: Array<any> = [
    { value: 'ประถมศึกษาปีที่ 1', viewValue: 'ประถมศึกษาปีที่ 1' },
    { value: 'ประถมศึกษาปีที่ 2', viewValue: 'ประถมศึกษาปีที่ 2' },
    { value: 'ประถมศึกษาปีที่ 3', viewValue: 'ประถมศึกษาปีที่ 3' },
    { value: 'ประถมศึกษาปีที่ 4', viewValue: 'ประถมศึกษาปีที่ 4' },
    { value: 'ประถมศึกษาปีที่ 5', viewValue: 'ประถมศึกษาปีที่ 5' },
    { value: 'ประถมศึกษาปีที่ 6', viewValue: 'ประถมศึกษาปีที่ 6' },
    { value: 'มัธยมศึกษาปีที่ 1', viewValue: 'มัธยมศึกษาปีที่ 1' },
    { value: 'มัธยมศึกษาปีที่ 2', viewValue: 'มัธยมศึกษาปีที่ 2' },
    { value: 'มัธยมศึกษาปีที่ 3', viewValue: 'มัธยมศึกษาปีที่ 3' },
    { value: 'มัธยมศึกษาปีที่ 4', viewValue: 'มัธยมศึกษาปีที่ 4' },
    { value: 'มัธยมศึกษาปีที่ 5', viewValue: 'มัธยมศึกษาปีที่ 5' },
    { value: 'มัธยมศึกษาปีที่ 6', viewValue: 'มัธยมศึกษาปีที่ 6' }
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

  constructor(private admissionService: AdmissionsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this._fuseTranslationLoaderService.loadTranslations(english, thai);
    // DateAdapter()
    this.dateAdapter.setLocale('th-TH');
  }

  ngOnInit() {
    this.admissionService.onEditDataChanged.subscribe((res: any) => {
      this.admissions = res;
      // console.log(this.admissions);
      if (!this.admissions) {
        this.admissions = {
          class: "",
          prefix: "",
          firstname: "",
          lastname: "",
          identificationnumber: "",
          birthday: "",
          sex: "",
          fatherfullname: "",
          motherfullname: "",
          phonenumber: ""
        }
      }
      this.admissionsForm = this.createadmissionsForm();
    });
  }

  createadmissionsForm() {

    if (this.admissions.birthday) {
      this.admissions.birthday = this.admissions.birthday.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3");
    }
    return this.formBuilder.group({
      _id: [this.admissions._id],
      class: [this.admissions.class, Validators.required],
      prefix: [this.admissions.prefix, Validators.required],
      firstname: [this.admissions.firstname, Validators.required],
      lastname: [this.admissions.lastname, Validators.required],
      identificationnumber: [this.admissions.identificationnumber, [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(13),
        Validators.maxLength(13)
      ]],
      birthday: [new Date(this.admissions.birthday), Validators.required],
      sex: [this.admissions.sex, Validators.required],
      fatherfullname: [this.admissions.fatherfullname, Validators.required],
      motherfullname: [this.admissions.motherfullname, Validators.required],
      phonenumber: [this.admissions.phonenumber, [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10),
        Validators.maxLength(10)
      ]]
    });
  }

  onsaveEdit() {
    console.log("onsaveEdit");
    this.admissionService.editAdmissionsData(this.admissionsForm.getRawValue()).then(values => {
      this._location.back();
    });
  }

  onadmissionsNew() {
    console.log("onadmissionsNew");
    this.admissionService.ADDadmissionsData(this.admissionsForm.getRawValue()).then(values => {
      this._location.back();
    });
  }

  onClose() {
    // this.router.navigate(['admissions']);
    this._location.back();

  }
  goBack() {
    this._location.back();
  }

}
