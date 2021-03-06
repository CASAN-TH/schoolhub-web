import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from "xlsx";
import { CoursesService } from '../courses.service';
import { Location } from '@angular/common';

import { locale as english } from '../i18n/en';
import { locale as thai } from '../i18n/th';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

@Component({
  selector: 'app-newcourse',
  templateUrl: './newcourse.component.html',
  styleUrls: ['./newcourse.component.scss']
})
export class NewcourseComponent implements OnInit {

  fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  data: any = [];
  datas: Array<any>;
  summary: Array<any>;

  displayedColumns: string[] = ['year', 'name', 'basic', 'advance', 'activity', 'students'];

  constructor(
    private http: HttpClient,
    private coursesService: CoursesService,
    private _location: Location,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService
  ) { this._fuseTranslationLoaderService.loadTranslations(english, thai); }

  ngOnInit() {
    this.coursesService.onImportDataChanged.subscribe((res: any) => {
      this.data = res;
      this.summary = res ? res.summary : null;
      console.log(this.data);
    });

  }

  download() {
    // tslint:disable-next-line: max-line-length
    this.http.get("https://res.cloudinary.com/hhpl9pajl/raw/upload/v1569989941/transcriptImport_wtv7j6.xlsx", { responseType: "arraybuffer" })
      .subscribe(response => this.downLoadFile(response, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
  }

  downLoadFile(data: any, type: string) {
    const blob = new Blob([data], { type: type });
    const url = window.URL.createObjectURL(blob);
    const pwa = window.open(url);
    // tslint:disable-next-line: triple-equals
    if (!pwa || pwa.closed || typeof pwa.closed == "undefined") {
      alert("Please disable your Pop-up blocker and try again.");
    }
  }

  detectFiles(ev) {
    const files = ev.target.files;
    this.validateFile(files);
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drop(ev) {
    ev.preventDefault();
    const files = ev.dataTransfer.files;
    this.validateFile(files);
  }

  validateFile(files: Array<any>) {
    if (files.length === 1 && files[0].type === this.fileType) {
      this.ReadDataFromFile(files[0]);
    } else {
      console.log("false");
    }
  }

  onCancle() {
    // console.log("onCancle");
    // console.log(this.data);
    this.coursesService.deleteImportData(this.data._id);
  }

  onSave() {
    //console.log("onSave");
    this.coursesService.importData(this.data).then(res=>{
      this._location.back();
    });
  }

  ReadDataFromFile(file: any) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event: any) => {
      const oReq = new XMLHttpRequest();
      oReq.open("GET", event.target.result, true);
      oReq.responseType = "arraybuffer";

      oReq.onload = async e => {
        const arraybuffer = oReq.response;
        /* convert data to binary string */
        const data = new Uint8Array(arraybuffer);
        const arr = new Array();
        for (let i = 0; i !== data.length; ++i) {
          arr[i] = String.fromCharCode(data[i]);
        }
        const bstr = arr.join("");
        const workbook = XLSX.read(bstr, { type: "binary" });
        let JsonData = [];
        let i = 0;
        workbook.SheetNames.forEach(element => {

          const json = XLSX.utils.sheet_to_json(
            workbook.Sheets[workbook.SheetNames[i]]
            // console.log(workbook.getSheet(i).)
          );
          JsonData.push({
            name: element,
            data: json
          });
          i++;
        });
        
        this.coursesService.readFile(JsonData);
        // const json = XLSX.utils.sheet_to_json(
        //   workbook.Sheets[workbook.SheetNames[0]]
        // );
        // this.data = {
        //   filename: file.name,
        //   data: json
        // };
        // this.data.data.forEach(item => {
        //   const mapData = item;
        //   // tslint:disable-next-line: forin
        //   for (const prop in mapData) {
        //     const fieldName = prop.replace(/(\r\n|\n|\r)/gm, '_').split('_(')[0].replace(' ', '').replace('.', '').replace('**', 'reward').toLowerCase();
        //     mapData[fieldName] = mapData[prop];
        //     delete mapData[prop];
        //   }
        // });
        // this.datas = this.data.data;
        // console.log(this.datas);
      };
      oReq.send();
    };

  }
}
