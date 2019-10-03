import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../courses.service';
import { AuthenService } from 'app/authentication/authen.service';
import { Location } from '@angular/common';
import { environment } from 'environments/environment.hmr';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from '../../i18n/en';
import { locale as thai } from '../../i18n/th';



@Component({
  selector: 'app-transcript',
  templateUrl: './transcript.component.html',
  styleUrls: ['./transcript.component.scss']
})
export class TranscriptComponent implements OnInit {
  student: any;
  school: any;
  displayedColumns = ['numbers', 'code', 'name', 'type', 'weight', 'result', 'remark'];

  constructor(
    private CourseService: CoursesService,
    private AuthService: AuthenService,
    private _location: Location,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService
  ) {
    this._fuseTranslationLoaderService.loadTranslations(english, thai);
  }

  ngOnInit() {
    this.CourseService.onTranscriptChanged.subscribe((res: any) => {
      this.student = res;
    })
    this.school = this.AuthService.school;
  }

  onCancel() {
    this._location.back();
  }

  onSaveTranscript() {
    this.CourseService.createTranscript(this.student).then((res: any) => {
      this._location.back();
    });

  }
  goBack() {
    this._location.back();
  }

  printtranscript() {
    window.open(environment.apiUrl + '/api/course/transcriptreport/' + this.student._id);
  }
}
