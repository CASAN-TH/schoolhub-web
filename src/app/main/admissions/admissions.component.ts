import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as thai } from './i18n/th';
import { AdmissionsService } from './admissions.service';
import { fuseAnimations } from '@fuse/animations';

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
    private admissionsService: AdmissionsService
  ) {
    this._fuseTranslationLoaderService.loadTranslations(english, thai);
  }


  ngOnInit(): void {
    this.admissionsService.onDataChanged.subscribe((res: any) => {
      this.admissions = res;
    });
  }

}
