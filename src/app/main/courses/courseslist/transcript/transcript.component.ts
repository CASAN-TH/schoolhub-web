import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../courses.service';

@Component({
  selector: 'app-transcript',
  templateUrl: './transcript.component.html',
  styleUrls: ['./transcript.component.scss']
})
export class TranscriptComponent implements OnInit {
  student: any;
  transcript: any = [{
    result: '',
    remark: ''
  }]
  displayedColumns = ['numbers', 'code', 'name', 'type', 'weight', 'result', 'remark'];

  constructor(
    private CourseService: CoursesService
  ) { }

  ngOnInit() {
    this.CourseService.onTranscriptChanged.subscribe((res: any) => {
      this.student = res;
      console.log(res);
    })
  }

  onSaveTranscript(){
    console.log(this.transcript);
  }

}
