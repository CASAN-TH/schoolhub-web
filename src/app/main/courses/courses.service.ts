import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { resolve } from 'url';
import { reject } from 'q';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  onCoursesChanged: BehaviorSubject<any>;
  onCourseChanged: BehaviorSubject<any>;
  onTranscriptChanged: BehaviorSubject<any>;
  onImportDataChanged: BehaviorSubject<any>;
  routeParams: any;
  courseId: any;

  constructor(
    private http: HttpClient
  ) {
    this.onCoursesChanged = new BehaviorSubject([]);
    this.onCourseChanged = new BehaviorSubject([]);
    this.onTranscriptChanged = new BehaviorSubject([]);
    this.onImportDataChanged = new BehaviorSubject([]);
  }
  private authorizationHeader() {
    const token = window.localStorage.getItem(`token@${environment.appName}`);
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return headers;
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
    //new CourseYear
    if (this.routeParams.actiontype === 'newyear') {
      let yearfrom = parseInt(this.routeParams.year) - 1;
      let bodyyear = {
        from: yearfrom.toString(),
        to: this.routeParams.year
      }
      this.cloneCourseYear(bodyyear);
      // read CourseYear
    } else if (this.routeParams.actiontype === 'read') {
      this.getCourseYear(this.routeParams.year);
    } else if (this.routeParams.actiontype === 'import') {
      console.log("Import");
    } else {
      this.getCourseYear(this.routeParams.year);
    }
    if (this.routeParams.studentId) {
      this.getTranscript(this.routeParams);
    }
    this.getCouresList()
  }

  getCouresList(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiUrl + '/api/courses', { headers: this.authorizationHeader() }).subscribe((res: any) => {
        this.onCoursesChanged.next(res.data);
      })
    })
  }

  getCourseYear(year): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiUrl + '/api/courses/year/' + year, { headers: this.authorizationHeader() }).subscribe((res: any) => {
        this.onCourseChanged.next(res.data);
      })
    })
  }

  cloneCourseYear(year): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiUrl + "/api/courses/clone/" + year.from + "/" + year.to, null, { headers: this.authorizationHeader() }).subscribe((res: any) => {
        this.onCoursesChanged.next(res.data);
        this.getCourseYear(year.to);
      })
    });
  }

  courseSubjectEdit(data): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(environment.apiUrl + "/api/courses/" + data._id, data, { headers: this.authorizationHeader() }).subscribe((res: any) => {
        this.getCourseYear(res.data.year);
      })
    })
  }

  getTranscript(body): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiUrl + "/api/courses/" + body.courseId + "/" + body.studentId, { headers: this.authorizationHeader() }).subscribe((res: any) => {
        this.onTranscriptChanged.next(res.data);
      })
    })
  }

  createTranscript(body): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!body._id) {
        this.http.post(environment.apiUrl + "/api/course/transcript", body, { headers: this.authorizationHeader() }).subscribe((res: any) => {
          resolve(res);
        })
      } else {
        this.http.put(environment.apiUrl + "/api/course/transcript/" + body._id, body, { headers: this.authorizationHeader() }).subscribe((res: any) => {
          resolve(res);
        })
      }
    })
  }

  readFile(data: any) {
    console.log(data);
    // return new Promise((resolve, reject) => {
    //   this.http.post(environment.apiUrl + "/api/preimport", data, { headers: this.authorizationHeader() }).subscribe((response: any) => {
    //     this.onImportDataChanged.next(response.data);
    //     resolve(response.data);
    //   }, reject);
    // });

    const mockData = {
      "status": 200,
      "data": {
        "_id": "5d92ce87a0d4f50013c067e1",
        "courses": [
          {
            "year": "2562",
            "seq": "6",
            "grade": "12",
            "name": "ระดับชั้นมัธยมศึกษาปีที่ 6 เทอม 2",
            "structures": [
              {
                "_id": "5d92ce87a0d4f50013c067df",
                "seq": "1",
                "code": "ท33102",
                "subject": "ภาษาไทย",
                "course_type": "พื้นฐาน",
                "hours": "40",
                "weight": "1"
              },
              {
                "_id": "5d92ce87a0d4f50013c067de",
                "seq": "2",
                "code": "ค33102",
                "subject": "คณิตศาสตร์",
                "course_type": "พื้นฐาน",
                "hours": "40",
                "weight": "1"
              },
              {
                "_id": "5d92ce87a0d4f50013c067dd",
                "seq": "3",
                "code": "ว33102",
                "subject": "ฟิสิกส์",
                "course_type": "พื้นฐาน",
                "hours": "20",
                "weight": "0.5"
              },
              {
                "_id": "5d92ce87a0d4f50013c067dc",
                "seq": "4",
                "code": "ส33103",
                "subject": "สังคมศึกษา ศาสนาและวัฒนธรรม",
                "course_type": "พื้นฐาน",
                "hours": "20",
                "weight": "0.5"
              },
              {
                "_id": "5d92ce87a0d4f50013c067db",
                "seq": "5",
                "code": "ส33104",
                "subject": "ประวัติศาสตร์",
                "course_type": "พื้นฐาน",
                "hours": "20",
                "weight": "0.5"
              },
              {
                "_id": "5d92ce87a0d4f50013c067da",
                "seq": "6",
                "code": "พ33102",
                "subject": "สุขศึกษาและพลศึกษา",
                "course_type": "พื้นฐาน",
                "hours": "20",
                "weight": "0.5"
              },
              {
                "_id": "5d92ce87a0d4f50013c067d9",
                "seq": "7",
                "code": "ศ33102",
                "subject": "ศิลปะ",
                "course_type": "พื้นฐาน",
                "hours": "60",
                "weight": "1.5"
              },
              {
                "_id": "5d92ce87a0d4f50013c067d8",
                "seq": "8",
                "code": "ง33102",
                "subject": "การงานอาชีพและเทคโนโลยี",
                "course_type": "พื้นฐาน",
                "hours": "20",
                "weight": "0.5"
              },
              {
                "_id": "5d92ce87a0d4f50013c067d7",
                "seq": "9",
                "code": "อ33102",
                "subject": "ภาษาอังกฤษ",
                "course_type": "พื้นฐาน",
                "hours": "40",
                "weight": "1"
              },
              {
                "_id": "5d92ce87a0d4f50013c067d6",
                "seq": "10",
                "code": "ก1",
                "subject": "แนะแนว",
                "course_type": "กิจกรรม",
                "hours": "20",
                "weight": "-"
              },
              {
                "_id": "5d92ce87a0d4f50013c067d5",
                "seq": "11",
                "code": "ก2",
                "subject": "ชุมนุม",
                "course_type": "กิจกรรม",
                "hours": "20",
                "weight": "-"
              },
              {
                "_id": "5d92ce87a0d4f50013c067d4",
                "seq": "12",
                "code": "ก3",
                "subject": "กิจกรรมสังคมและสาธารณประโยชน์",
                "course_type": "กิจกรรม",
                "hours": "20",
                "weight": "-"
              }
            ],
            "students": [
              {
                "_id": "5d92ce87a0d4f50013c067e1",
                "seq": "1",
                "student_id": "35test",
                "title": "เด็กชาย",
                "firstname": "ดนัทธ์",
                "lastname": "ผูกพัน",
                "student_no": "3535",
                "citizenid": "1232233456776",
                "birthday": "7",
                "birthmonth": "มีนาคม",
                "birthyear": "2550",
                "sex": "ชาย",
                "nationality": "ไทย",
                "religion": "พุทธ",
                "fathername": "นายดนัย ผูกพัน",
                "mothername": "นางสาวดนันนิต ผูกพัน",
                "attendencedate": "16 พฤษภาคม 2559",
                "oldschool": "โรงเรียนน้ำพองศึกษา",
                "oldprovince": "ขอนแก่น",
                "lastclass": "มัธยมศึกษาปีที่ 5"
              },
              {
                "_id": "5d92ce87a0d4f50013c067e0",
                "seq": "2",
                "student_id": "36test",
                "title": "เด็กหญิง",
                "firstname": "ทิพนาถ",
                "lastname": "อันประเสริฐ",
                "student_no": "3636",
                "citizenid": "6543344252110",
                "sex": "หญิง",
                "nationality": "ไทย",
                "religion": "พุทธ",
                "fathername": "นายทิพชัย อันประเสริฐ",
                "mothername": "นางสาวทิพรส อันประเสริฐ",
                "attendencedate": "16 พฤษภาคม 2559",
                "oldschool": "โรงเรียนชุมพลโพนพิสัย",
                "oldprovince": "หนองคาย",
                "lastclass": "มัธยมศึกษาปีที่ 5"
              }
            ],
            "school": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVieSI6eyJfaWQiOiI1ZDg4NWFmZDI2OGRlYTAwMTkxMDAxN2QiLCJ1c2VybmFtZSI6ImppZ2tvaDNAZ21haWwuY29tIiwiZGlzcGxheW5hbWUiOiJLQU5USU1BIFNPUEhBS1VMIC0ifSwiX2lkIjoiNWQ4OTk2ZWMzZWU4MzUwMDFhMjYxYWVhIiwic2Nob29sbmFtZSI6IuC5hOC4leC4o-C4nuC4seC4kuC4meC5jCIsInVuZGVyIjoi4Liq4Liz4LiZ4Lix4LiB4LiH4Liy4LiZ4LiE4LiT4Liw4LiB4Lij4Lij4Lih4LiB4Liy4Lij4Liq4LmI4LiH4LmA4Liq4Lij4Li04Lih4LiB4Liy4Lij4Lio4Li24LiB4Lip4Liy4LmA4Lit4LiB4LiK4LiZIiwiYXJlYSI6IuC4m-C4o-C4sOC4luC4oeC4qOC4tuC4geC4qeC4suC4m-C4l-C4uOC4oeC4mOC4suC4meC4tSDguYDguILguJUgMiIsInN1YmRpc3RyaWMiOiLguJrguLbguIfguITguLPguJ7guKPguYnguK3guKIiLCJkaXN0cmljIjoi4Lil4Liz4Lil4Li54LiB4LiB4LiyIiwicHJvdmluY2UiOiLguJvguJfguLjguKHguJjguLLguJnguLUiLCJyZWdpc3RyYXIiOiLguJnguLLguIfguKrguLLguKfguKjguLTguJjguKMg4Liq4Li04LiX4LiY4Li04LiK4Lix4LiiIiwicG9zaXRpb24iOiLguJnguLLguKLguJfguLDguYDguJrguLXguKLguJkiLCJkaXJlY3Rpb24iOiLguJnguLLguIfguKrguLLguKfguJnguLHguJnguJfguJnguLIg4LmA4LiB4Lip4Lih4LmC4LiB4Liq4Li04LiZ4LiX4Lij4LmMIiwicG9zaXRpb25zIjoi4Lic4Li54LmJ4Lit4Liz4LiZ4Lin4Lii4LiB4Liy4Lij4LmC4Lij4LiH4LmA4Lij4Li14Lii4LiZIiwiY3JlYXRlZCI6IjIwMTktMDktMjRUMDQ6MDk6MTYuODE4WiIsIl9fdiI6MCwiaWF0IjoxNTY5Mjk4MTU2fQ.gQ25ftTo6G5F_GMUySMW7pO-8szr7BIpwJ4GdP5XW6Y"
          },
          {
            "year": "2562",
            "seq": "3",
            "grade": "12",
            "name": "ระดับชั้นมัธยมศึกษาปีที่ 6 เทอม 1",
            "structures": [
              {
                "_id": "5d92ce73a0d4f50013c067d0",
                "seq": "1",
                "code": "ท33101",
                "subject": "ภาษาไทย",
                "course_type": "พื้นฐาน",
                "hours": "40",
                "weight": "1"
              },
              {
                "_id": "5d92ce73a0d4f50013c067cf",
                "seq": "2",
                "code": "ค33101",
                "subject": "คณิตศาสตร์",
                "course_type": "พื้นฐาน",
                "hours": "40",
                "weight": "1"
              },
              {
                "_id": "5d92ce73a0d4f50013c067ce",
                "seq": "3",
                "code": "ว33101",
                "subject": "วิทยาศาสตร์",
                "course_type": "พื้นฐาน",
                "hours": "20",
                "weight": "0.5"
              },
              {
                "_id": "5d92ce73a0d4f50013c067cd",
                "seq": "4",
                "code": "ส33101",
                "subject": "สังคมศึกษา ศาสนาและวัฒนธรรม",
                "course_type": "พื้นฐาน",
                "hours": "20",
                "weight": "0.5"
              },
              {
                "_id": "5d92ce73a0d4f50013c067cc",
                "seq": "5",
                "code": "ส33102",
                "subject": "ประวัติศาสตร์",
                "course_type": "พื้นฐาน",
                "hours": "20",
                "weight": "0.5"
              },
              {
                "_id": "5d92ce73a0d4f50013c067cb",
                "seq": "6",
                "code": "พ33101",
                "subject": "สุขศึกษาและพลศึกษา",
                "course_type": "พื้นฐาน",
                "hours": "20",
                "weight": "0.5"
              },
              {
                "_id": "5d92ce73a0d4f50013c067ca",
                "seq": "7",
                "code": "ศ33101",
                "subject": "ศิลปะ",
                "course_type": "พื้นฐาน",
                "hours": "20",
                "weight": "0.5"
              },
              {
                "_id": "5d92ce73a0d4f50013c067c9",
                "seq": "8",
                "code": "ง33101",
                "subject": "การงานอาชีพและเทคโนโลยี",
                "course_type": "พื้นฐาน",
                "hours": "40",
                "weight": "1"
              },
              {
                "_id": "5d92ce73a0d4f50013c067c8",
                "seq": "9",
                "code": "อ33101",
                "subject": "ภาษาอังกฤษ",
                "course_type": "พื้นฐาน",
                "hours": "60",
                "weight": "1.5"
              },
              {
                "_id": "5d92ce73a0d4f50013c067c7",
                "seq": "10",
                "code": "ก1",
                "subject": "แนะแนว",
                "course_type": "กิจกรรม",
                "hours": "20",
                "weight": "-"
              },
              {
                "_id": "5d92ce73a0d4f50013c067c6",
                "seq": "11",
                "code": "ก2",
                "subject": "ชุมนุม",
                "course_type": "กิจกรรม",
                "hours": "20",
                "weight": "-"
              },
              {
                "_id": "5d92ce73a0d4f50013c067c5",
                "seq": "12",
                "code": "ก3",
                "subject": "กิจกรรมสังคมและสาธารณประโยชน์",
                "course_type": "กิจกรรม",
                "hours": "20",
                "weight": "-"
              }
            ],
            "students": [
              {
                "_id": "5d92ce73a0d4f50013c067d2",
                "seq": "1",
                "student_id": "33test",
                "title": "เด็กชาย",
                "firstname": "นันทภพ",
                "lastname": "เป็นระเบียบ",
                "student_no": "3333",
                "citizenid": "2343322123445",
                "birthday": "28",
                "birthmonth": "มีนาคม",
                "birthyear": "2550",
                "sex": "ชาย",
                "nationality": "ไทย",
                "religion": "พุทธ",
                "fathername": "นายนันทพัฒน์ เป็นระเบียบ",
                "mothername": "นางสาวนันทพร เป็นระเบียบ",
                "attendencedate": "16 พฤษภาคม 2559",
                "oldschool": "โรงเรียนน้ำพองศึกษา",
                "oldprovince": "ขอนแก่น",
                "lastclass": "มัธยมศึกษาปีที่ 5"
              },
              {
                "_id": "5d92ce73a0d4f50013c067d1",
                "seq": "2",
                "student_id": "34test",
                "title": "เด็กหญิง",
                "firstname": "รัญชิดา",
                "lastname": "แห่งผู้กล้า",
                "student_no": "3434",
                "citizenid": "2343322565778",
                "sex": "หญิง",
                "nationality": "ไทย",
                "religion": "พุทธ",
                "fathername": "นายรัญ แห่งผู้กล้า",
                "mothername": "นางสาวรัญญา แห่งผู้กล้า",
                "attendencedate": "16 พฤษภาคม 2559",
                "oldschool": "โรงเรียนชุมพลโพนพิสัย",
                "oldprovince": "หนองคาย",
                "lastclass": "มัธยมศึกษาปีที่ 5"
              }
            ],
            "school": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVieSI6eyJfaWQiOiI1ZDg4NWFmZDI2OGRlYTAwMTkxMDAxN2QiLCJ1c2VybmFtZSI6ImppZ2tvaDNAZ21haWwuY29tIiwiZGlzcGxheW5hbWUiOiJLQU5USU1BIFNPUEhBS1VMIC0ifSwiX2lkIjoiNWQ4OTk2ZWMzZWU4MzUwMDFhMjYxYWVhIiwic2Nob29sbmFtZSI6IuC5hOC4leC4o-C4nuC4seC4kuC4meC5jCIsInVuZGVyIjoi4Liq4Liz4LiZ4Lix4LiB4LiH4Liy4LiZ4LiE4LiT4Liw4LiB4Lij4Lij4Lih4LiB4Liy4Lij4Liq4LmI4LiH4LmA4Liq4Lij4Li04Lih4LiB4Liy4Lij4Lio4Li24LiB4Lip4Liy4LmA4Lit4LiB4LiK4LiZIiwiYXJlYSI6IuC4m-C4o-C4sOC4luC4oeC4qOC4tuC4geC4qeC4suC4m-C4l-C4uOC4oeC4mOC4suC4meC4tSDguYDguILguJUgMiIsInN1YmRpc3RyaWMiOiLguJrguLbguIfguITguLPguJ7guKPguYnguK3guKIiLCJkaXN0cmljIjoi4Lil4Liz4Lil4Li54LiB4LiB4LiyIiwicHJvdmluY2UiOiLguJvguJfguLjguKHguJjguLLguJnguLUiLCJyZWdpc3RyYXIiOiLguJnguLLguIfguKrguLLguKfguKjguLTguJjguKMg4Liq4Li04LiX4LiY4Li04LiK4Lix4LiiIiwicG9zaXRpb24iOiLguJnguLLguKLguJfguLDguYDguJrguLXguKLguJkiLCJkaXJlY3Rpb24iOiLguJnguLLguIfguKrguLLguKfguJnguLHguJnguJfguJnguLIg4LmA4LiB4Lip4Lih4LmC4LiB4Liq4Li04LiZ4LiX4Lij4LmMIiwicG9zaXRpb25zIjoi4Lic4Li54LmJ4Lit4Liz4LiZ4Lin4Lii4LiB4Liy4Lij4LmC4Lij4LiH4LmA4Lij4Li14Lii4LiZIiwiY3JlYXRlZCI6IjIwMTktMDktMjRUMDQ6MDk6MTYuODE4WiIsIl9fdiI6MCwiaWF0IjoxNTY5Mjk4MTU2fQ.gQ25ftTo6G5F_GMUySMW7pO-8szr7BIpwJ4GdP5XW6Y"
          },
          {
            "year": "2562",
            "seq": "5",
            "grade": "11",
            "name": "ระดับชั้นมัธยมศึกษาปีที่ 5 เทอม 2",
            "structures": [
              {
                "_id": "5d92ce61a0d4f50013c067c1",
                "seq": "1",
                "code": "ท32102",
                "subject": "ภาษาไทย",
                "course_type": "พื้นฐาน",
                "hours": "40",
                "weight": "1"
              },
              {
                "_id": "5d92ce61a0d4f50013c067c0",
                "seq": "2",
                "code": "ค32102",
                "subject": "คณิตศาสตร์",
                "course_type": "พื้นฐาน",
                "hours": "40",
                "weight": "1"
              },
              {
                "_id": "5d92ce61a0d4f50013c067bf",
                "seq": "3",
                "code": "ว32103",
                "subject": "วิทยาศาสตร์",
                "course_type": "พื้นฐาน",
                "hours": "20",
                "weight": "0.5"
              },
              {
                "_id": "5d92ce61a0d4f50013c067be",
                "seq": "4",
                "code": "ว32104",
                "subject": "ฟิสิกส์",
                "course_type": "พื้นฐาน",
                "hours": "20",
                "weight": "0.5"
              },
              {
                "_id": "5d92ce61a0d4f50013c067bd",
                "seq": "5",
                "code": "ส32103",
                "subject": "สังคมศึกษา ศาสนาและวัฒนธรรม",
                "course_type": "พื้นฐาน",
                "hours": "20",
                "weight": "0.5"
              },
              {
                "_id": "5d92ce61a0d4f50013c067bc",
                "seq": "6",
                "code": "ส32104",
                "subject": "ประวัติศาสตร์",
                "course_type": "พื้นฐาน",
                "hours": "20",
                "weight": "0.5"
              },
              {
                "_id": "5d92ce61a0d4f50013c067bb",
                "seq": "7",
                "code": "พ32102",
                "subject": "สุขศึกษาและพลศึกษา",
                "course_type": "พื้นฐาน",
                "hours": "20",
                "weight": "0.5"
              },
              {
                "_id": "5d92ce61a0d4f50013c067ba",
                "seq": "8",
                "code": "ศ32102",
                "subject": "ศิลปะ",
                "course_type": "พื้นฐาน",
                "hours": "20",
                "weight": "0.5"
              },
              {
                "_id": "5d92ce61a0d4f50013c067b9",
                "seq": "9",
                "code": "ง32102",
                "subject": "การงานอาชีพและเทคโนโลยี",
                "course_type": "พื้นฐาน",
                "hours": "20",
                "weight": "0.5"
              },
              {
                "_id": "5d92ce61a0d4f50013c067b8",
                "seq": "10",
                "code": "อ32102",
                "subject": "ภาษาอังกฤษ",
                "course_type": "พื้นฐาน",
                "hours": "60",
                "weight": "1.5"
              },
              {
                "_id": "5d92ce61a0d4f50013c067b7",
                "seq": "11",
                "code": "ก1",
                "subject": "แนะแนว",
                "course_type": "กิจกรรม",
                "hours": "20",
                "weight": "-"
              },
              {
                "_id": "5d92ce61a0d4f50013c067b6",
                "seq": "12",
                "code": "ก2",
                "subject": "ชุมนุม",
                "course_type": "กิจกรรม",
                "hours": "20",
                "weight": "-"
              },
              {
                "_id": "5d92ce61a0d4f50013c067b5",
                "seq": "13",
                "code": "ก3",
                "subject": "กิจกรรมสังคมและสาธารณประโยชน์",
                "course_type": "กิจกรรม",
                "hours": "20",
                "weight": "-"
              }
            ],
            "students": [
              {
                "_id": "5d92ce61a0d4f50013c067c3",
                "seq": "1",
                "student_id": "31test",
                "title": "เด็กชาย",
                "firstname": "ธีภพ",
                "lastname": "มีปัญญา",
                "student_no": "3030",
                "citizenid": "2343344543334",
                "birthday": "18",
                "birthmonth": "มกราคม",
                "birthyear": "2550",
                "sex": "ชาย",
                "nationality": "ไทย",
                "religion": "พุทธ",
                "fathername": "นายธีระ มีปัญญา",
                "mothername": "นางสาวธีพร มีปัญญา",
                "attendencedate": "16 พฤษภาคม 2559",
                "oldschool": "โรงเรียนวิสุทธรังษี",
                "oldprovince": "กาญจนบุรี",
                "lastclass": "มัธยมศึกษาปีที่ 4"
              },
              {
                "_id": "5d92ce61a0d4f50013c067c2",
                "seq": "2",
                "student_id": "32test",
                "title": "เด็กหญิง",
                "firstname": "ธัญชนก",
                "lastname": "เกิดสิริ",
                "student_no": "3232",
                "citizenid": "2343322565778",
                "sex": "หญิง",
                "nationality": "ไทย",
                "religion": "พุทธ",
                "fathername": "นายธัญนที เกิดสิริ",
                "mothername": "นางสาวธัญรี เกิดสิริ",
                "attendencedate": "16 พฤษภาคม 2559",
                "oldschool": "โรงเรียนชุมพลโพนพิสัย",
                "oldprovince": "หนองคาย",
                "lastclass": "มัธยมศึกษาปีที่ 4"
              }
            ],
            "school": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVieSI6eyJfaWQiOiI1ZDg4NWFmZDI2OGRlYTAwMTkxMDAxN2QiLCJ1c2VybmFtZSI6ImppZ2tvaDNAZ21haWwuY29tIiwiZGlzcGxheW5hbWUiOiJLQU5USU1BIFNPUEhBS1VMIC0ifSwiX2lkIjoiNWQ4OTk2ZWMzZWU4MzUwMDFhMjYxYWVhIiwic2Nob29sbmFtZSI6IuC5hOC4leC4o-C4nuC4seC4kuC4meC5jCIsInVuZGVyIjoi4Liq4Liz4LiZ4Lix4LiB4LiH4Liy4LiZ4LiE4LiT4Liw4LiB4Lij4Lij4Lih4LiB4Liy4Lij4Liq4LmI4LiH4LmA4Liq4Lij4Li04Lih4LiB4Liy4Lij4Lio4Li24LiB4Lip4Liy4LmA4Lit4LiB4LiK4LiZIiwiYXJlYSI6IuC4m-C4o-C4sOC4luC4oeC4qOC4tuC4geC4qeC4suC4m-C4l-C4uOC4oeC4mOC4suC4meC4tSDguYDguILguJUgMiIsInN1YmRpc3RyaWMiOiLguJrguLbguIfguITguLPguJ7guKPguYnguK3guKIiLCJkaXN0cmljIjoi4Lil4Liz4Lil4Li54LiB4LiB4LiyIiwicHJvdmluY2UiOiLguJvguJfguLjguKHguJjguLLguJnguLUiLCJyZWdpc3RyYXIiOiLguJnguLLguIfguKrguLLguKfguKjguLTguJjguKMg4Liq4Li04LiX4LiY4Li04LiK4Lix4LiiIiwicG9zaXRpb24iOiLguJnguLLguKLguJfguLDguYDguJrguLXguKLguJkiLCJkaXJlY3Rpb24iOiLguJnguLLguIfguKrguLLguKfguJnguLHguJnguJfguJnguLIg4LmA4LiB4Lip4Lih4LmC4LiB4Liq4Li04LiZ4LiX4Lij4LmMIiwicG9zaXRpb25zIjoi4Lic4Li54LmJ4Lit4Liz4LiZ4Lin4Lii4LiB4Liy4Lij4LmC4Lij4LiH4LmA4Lij4Li14Lii4LiZIiwiY3JlYXRlZCI6IjIwMTktMDktMjRUMDQ6MDk6MTYuODE4WiIsIl9fdiI6MCwiaWF0IjoxNTY5Mjk4MTU2fQ.gQ25ftTo6G5F_GMUySMW7pO-8szr7BIpwJ4GdP5XW6Y"
          }
        ],
        "transcripts": [
          {
            "year": "2562",
            "school": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVieSI6eyJfaWQiOiI1ZDg4NWFmZDI2OGRlYTAwMTkxMDAxN2QiLCJ1c2VybmFtZSI6ImppZ2tvaDNAZ21haWwuY29tIiwiZGlzcGxheW5hbWUiOiJLQU5USU1BIFNPUEhBS1VMIC0ifSwiX2lkIjoiNWQ4OTk2ZWMzZWU4MzUwMDFhMjYxYWVhIiwic2Nob29sbmFtZSI6IuC5hOC4leC4o-C4nuC4seC4kuC4meC5jCIsInVuZGVyIjoi4Liq4Liz4LiZ4Lix4LiB4LiH4Liy4LiZ4LiE4LiT4Liw4LiB4Lij4Lij4Lih4LiB4Liy4Lij4Liq4LmI4LiH4LmA4Liq4Lij4Li04Lih4LiB4Liy4Lij4Lio4Li24LiB4Lip4Liy4LmA4Lit4LiB4LiK4LiZIiwiYXJlYSI6IuC4m-C4o-C4sOC4luC4oeC4qOC4tuC4geC4qeC4suC4m-C4l-C4uOC4oeC4mOC4suC4meC4tSDguYDguILguJUgMiIsInN1YmRpc3RyaWMiOiLguJrguLbguIfguITguLPguJ7guKPguYnguK3guKIiLCJkaXN0cmljIjoi4Lil4Liz4Lil4Li54LiB4LiB4LiyIiwicHJvdmluY2UiOiLguJvguJfguLjguKHguJjguLLguJnguLUiLCJyZWdpc3RyYXIiOiLguJnguLLguIfguKrguLLguKfguKjguLTguJjguKMg4Liq4Li04LiX4LiY4Li04LiK4Lix4LiiIiwicG9zaXRpb24iOiLguJnguLLguKLguJfguLDguYDguJrguLXguKLguJkiLCJkaXJlY3Rpb24iOiLguJnguLLguIfguKrguLLguKfguJnguLHguJnguJfguJnguLIg4LmA4LiB4Lip4Lih4LmC4LiB4Liq4Li04LiZ4LiX4Lij4LmMIiwicG9zaXRpb25zIjoi4Lic4Li54LmJ4Lit4Liz4LiZ4Lin4Lii4LiB4Liy4Lij4LmC4Lij4LiH4LmA4Lij4Li14Lii4LiZIiwiY3JlYXRlZCI6IjIwMTktMDktMjRUMDQ6MDk6MTYuODE4WiIsIl9fdiI6MCwiaWF0IjoxNTY5Mjk4MTU2fQ.gQ25ftTo6G5F_GMUySMW7pO-8szr7BIpwJ4GdP5XW6Y",
            "seq": "1",
            "grade": "1",
            "name": "ระดับชั้นประถมศึกษาปีที่ 1",
            "structures": [
              {
                "_id": "5d92cf16a0d4f50013c067f0",
                "seq": "1",
                "code": "ท11101",
                "subject": "ภาษาไทย",
                "course_type": "พื้นฐาน",
                "hours": "200",
                "weight": "5",
                "result": "4",
                "remark": ""
              },
              {
                "_id": "5d92cf16a0d4f50013c067ef",
                "seq": "2",
                "code": "ค11101",
                "subject": "คณิตศาสตร์",
                "course_type": "พื้นฐาน",
                "hours": "200",
                "weight": "5",
                "result": "4",
                "remark": ""
              },
              {
                "_id": "5d92cf16a0d4f50013c067ee",
                "seq": "3",
                "code": "ว11101",
                "subject": "วิทยาศาสตร์",
                "course_type": "พื้นฐาน",
                "hours": "80",
                "weight": "2",
                "result": "",
                "remark": ""
              },
              {
                "_id": "5d92cf16a0d4f50013c067ed",
                "seq": "4",
                "code": "ส11101",
                "subject": "สังคมศึกษา ศาสนาและวัฒนธรรม",
                "course_type": "พื้นฐาน",
                "hours": "80",
                "weight": "2",
                "result": "",
                "remark": ""
              },
              {
                "_id": "5d92cf16a0d4f50013c067ec",
                "seq": "5",
                "code": "ส11102",
                "subject": "ประวัติศาสตร์",
                "course_type": "พื้นฐาน",
                "hours": "40",
                "weight": "1",
                "result": "",
                "remark": ""
              },
              {
                "_id": "5d92cf16a0d4f50013c067eb",
                "seq": "6",
                "code": "พ11101",
                "subject": "สุขศึกษาและพลศึกษา",
                "course_type": "พื้นฐาน",
                "hours": "80",
                "weight": "2",
                "result": "",
                "remark": ""
              },
              {
                "_id": "5d92cf16a0d4f50013c067ea",
                "seq": "7",
                "code": "ศ11101",
                "subject": "ศิลปะ",
                "course_type": "พื้นฐาน",
                "hours": "80",
                "weight": "2",
                "result": "",
                "remark": ""
              },
              {
                "_id": "5d92cf16a0d4f50013c067e9",
                "seq": "8",
                "code": "ง11101",
                "subject": "การงานอาชีพและเทคโนโลยี",
                "course_type": "พื้นฐาน",
                "hours": "40",
                "weight": "1",
                "result": "",
                "remark": ""
              },
              {
                "_id": "5d92cf16a0d4f50013c067e8",
                "seq": "9",
                "code": "อ11101",
                "subject": "ภาษาอังกฤษ",
                "course_type": "พื้นฐาน",
                "hours": "40",
                "weight": "1",
                "result": "",
                "remark": ""
              },
              {
                "_id": "5d92cf16a0d4f50013c067e7",
                "seq": "10",
                "code": "จ11201",
                "subject": "ภาษาจีน",
                "course_type": "เพิ่มเติม",
                "hours": "40",
                "weight": "1",
                "result": "",
                "remark": ""
              },
              {
                "_id": "5d92cf16a0d4f50013c067e6",
                "seq": "11",
                "code": "ก1",
                "subject": "แนะแนว",
                "course_type": "กิจกรรม",
                "hours": "30",
                "weight": "-",
                "result": "",
                "remark": ""
              },
              {
                "_id": "5d92cf16a0d4f50013c067e5",
                "seq": "12",
                "code": "ก2",
                "subject": "ลูกเสือ/เนตรนารี",
                "course_type": "กิจกรรม",
                "hours": "40",
                "weight": "-",
                "result": "",
                "remark": ""
              },
              {
                "_id": "5d92cf16a0d4f50013c067e4",
                "seq": "13",
                "code": "ก3",
                "subject": "ชุมนุม",
                "course_type": "กิจกรรม",
                "hours": "40",
                "weight": "-",
                "result": "",
                "remark": ""
              },
              {
                "_id": "5d92cf16a0d4f50013c067e3",
                "seq": "14",
                "code": "ก4",
                "subject": "กิจกรรมสังคมและสาธารณประโยชน์",
                "course_type": "กิจกรรม",
                "hours": "10",
                "weight": "-",
                "result": "",
                "remark": ""
              }
            ],
            "student": {
              "seq": "1",
              "student_id": "1test",
              "title": "เด็กชาย",
              "firstname": "ธานี",
              "lastname": "ใจดี",
              "student_no": "11111",
              "citizenid": "1208877654333",
              "birthday": "9",
              "birthmonth": "มกราคม",
              "birthyear": "2550",
              "sex": "ชาย",
              "nationality": "ไทย",
              "religion": "พุทธ",
              "fathername": "นายสมชาย ใจดี",
              "mothername": "นางสมหญิง ใจดี",
              "attendencedate": "16 พฤษภาคม 2557",
              "oldschool": "โรงเรียนวัด",
              "oldprovince": "มุกดาหาร",
              "lastclass": "อนุบาล 3"
            },
            "summary": {
              "weightsubjectbasic": "21",
              "weightsubjectadditional": "1",
              "sumweightsubject": "22",
              "gpa": "4.00",
              "attribute1": "ผ่าน",
              "attribute2": "ผ่าน",
              "attribute3": "ไม่ผ่าน"
            }
          }
        ],
        "summary": [
          {
            "year": "2562",
            "seq": "6",
            "grade": "12",
            "name": "ระดับชั้นมัธยมศึกษาปีที่ 6 เทอม 2",
            "structures": {
              "basic": 12,
              "advance": 12,
              "activity": 3
            },
            "students": 2
          }
        ]
      }
    };
    return new Promise((resolve, reject) => {
      this.onImportDataChanged.next(mockData.data);
    });
  }

  deleteImportData(_id) {
    return new Promise((resolve, reject) => {
      this.http.delete(environment.apiUrl + "/api/preimport/" + _id, { headers: this.authorizationHeader() }).subscribe((response: any) => {
        this.onImportDataChanged.next(response.data);
        resolve(response.data);
      }, reject);
    });
  }

  importData(data: any) {
    return new Promise((resolve, reject) => {
      this.http.put(environment.apiUrl + "/api/preimport/" + data._id, data, { headers: this.authorizationHeader() }).subscribe((response: any) => {
        resolve(response.data);
      }, reject);
    });
  }


}
