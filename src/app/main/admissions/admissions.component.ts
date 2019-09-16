import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as thai } from './i18n/th';
import { AdmissionsService } from './admissions.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admissions',
  templateUrl: './admissions.component.html',
  styleUrls: ['./admissions.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class AdmissionsComponent implements OnInit {

  admissiondata: any;
  admissions: any = [];
  displayedColumns = ['prefix', 'firstname', 'fatherfullname', 'motherfullname', 'phonenumber', 'buttons'];

  constructor(
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private admissionsService: AdmissionsService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this._fuseTranslationLoaderService.loadTranslations(english, thai);
  }


  ngOnInit(): void {
    this.admissionsService.onDataChanged.subscribe((res: any) => {
      if (res) {
        this.admissions = res;
      }
    });
  }

  onEditadmissions(admission) {
    this.router.navigate(['admissions/' + admission._id]);
  }

  onAddadmissions() {
    this.router.navigate(['admissions/new']);
  }

  onDeleteadmissions(_id: any) {
    // console.log(_id);
    this.admissionsService.deleteData(_id);
  }

  onImportData(admission) {
    this.admissiondata = {
      class: admission.class,
      room: ' ',
      studentid: ' ',
      prefix: admission.prefix,
      firstname: admission.firstname,
      lastname: admission.lastname,
      identificationnumber: admission.identificationnumber,
      birthday: admission.birthday,
      sex: admission.sex,
      fatherfullname: admission.fatherfullname,
      motherfullname: admission.motherfullname,
      phonenumber: admission.phonenumber,

    }
    console.log(this.admissiondata);
    this.admissionsService.importData(this.admissiondata);
  }

}
