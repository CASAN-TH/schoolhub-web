import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from './i18n/en';
import { locale as thai } from './i18n/th';
import { SchoolService } from './school.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnInit {

  schoolsForm: FormGroup;



  constructor(
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private formBuilder: FormBuilder,
    private schoolservice: SchoolService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this._fuseTranslationLoaderService.loadTranslations(english, thai);
  }


  ngOnInit(): void {
    this.schoolsForm = this.formBuilder.group(
      {
        schoolname: ['', Validators.required],
        under: ['', Validators.required],
        area: ['', Validators.required],
        subdistric: ['', Validators.required],
        distric: ['', Validators.required],
        province: ['', Validators.required],
        registrar: ['', Validators.required],
        position: ['', Validators.required],
        direction: ['', Validators.required],
        positions: ['', Validators.required]
      }

    );

  }




  onSaveSchool() {
    this.schoolservice.addSchool(this.schoolsForm.getRawValue()).then(data => {
      this.router.navigate(['']);
    });

  }
}
