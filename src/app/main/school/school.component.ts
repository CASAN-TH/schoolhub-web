import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from './i18n/en';
import { locale as thai } from './i18n/th';
import { SchoolService } from './school.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnInit {

 
  schoolsForm: FormGroup;
  public files: NgxFileDropEntry[] = [];


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

 
 
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
 
          // Here you can access the real file
          // console.log(file);

          this.schoolservice.uploadPhoto(file);
 
          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)
 
          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })
 
          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/
 
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  onSaveSchool() {
    this.schoolservice.addSchool(this.schoolsForm.getRawValue()).then(data => {
      this.router.navigate(['']);
    });
  }



}
