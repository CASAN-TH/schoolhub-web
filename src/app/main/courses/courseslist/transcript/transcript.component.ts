import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../courses.service';
import { AuthenService } from 'app/authentication/authen.service';
import { Location } from '@angular/common';
import { environment } from 'environments/environment.hmr';

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
    private AuthService:  AuthenService,
    private _location: Location
  ) { }

  ngOnInit() {
    this.CourseService.onTranscriptChanged.subscribe((res: any) => {
      this.student = res;
    })
    this.school = this.AuthService.school;
  }

  onCancel(){
    this._location.back();
  }

  onSaveTranscript(){
    this.CourseService.createTranscript(this.student).then((res :any) =>{
    this._location.back();
    });

  }
  goBack(){
    this._location.back();
  }

  printtranscript(){
    window.open(environment.apiUrl + '/api/course/transcriptreport/' + this.student._id);
  }
}
