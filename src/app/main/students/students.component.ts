import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as thai } from './i18n/th';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentsService } from './students.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class StudentsComponent implements OnInit {

  constructor(
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    private formBuilder: FormBuilder,
  ) {
    this._fuseTranslationLoaderService.loadTranslations(english, thai);
  }
  studentsForm: FormGroup;
  students: any = [];
  displayedColumns = ['prefix', 'firstname', 'studentid', 'fatherfullname', 'motherfullname', 'phonenumber', 'buttons'];

  ngOnInit(): void {
    this.studentsService.onDataChanged.subscribe((res: any) => {
      if (res) {
        this.students = res;
      }

      // console.log(this.students);
    });
  }
  onAdstudents() {
    // console.log("onAdstudents");
    this.router.navigate(['students/new']);

  }
  onEditstudents(student) {
    this.router.navigate(['students/' + student._id]);
  }


}
