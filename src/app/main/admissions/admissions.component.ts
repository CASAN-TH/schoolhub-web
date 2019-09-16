import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as thai } from './i18n/th';
import { AdmissionsService } from './admissions.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admissions',
  templateUrl: './admissions.component.html',
  styleUrls: ['./admissions.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class AdmissionsComponent implements OnInit {

  admissions: any = [];
  displayedColumns = ['prefix', 'firstname', 'fatherfullname', 'motherfullname', 'phonenumber', 'buttons'];

  constructor(
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private admissionsService: AdmissionsService,
    private router: Router
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

  onImportData() {
    console.log("onImportData");
  }

}
