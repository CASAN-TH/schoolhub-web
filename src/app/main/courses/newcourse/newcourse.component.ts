import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from "xlsx";

@Component({
  selector: 'app-newcourse',
  templateUrl: './newcourse.component.html',
  styleUrls: ['./newcourse.component.scss']
})
export class NewcourseComponent implements OnInit {
  fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  data: any;
  datas: Array<any>;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  download() {
    // tslint:disable-next-line: max-line-length
    this.http.get("https://res.cloudinary.com/domizgt2v/raw/upload/v1566254100/excel-template/ImportConsignmentNote_-V1_avclft.xlsx", { responseType: "arraybuffer" })
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
         console.log(JsonData);
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
