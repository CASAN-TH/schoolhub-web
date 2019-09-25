import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { CoursesService } from '../../courses.service';
import { MatDialog } from '@angular/material/dialog';
import { SubjectdialogComponent } from './subjectdialog/subjectdialog.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {

  @Input()
  list: any;

  course: any;
  displayedColumns: string[] = ['numbers', 'id', 'name', 'type', 'time', 'weight', 'buttons'];

  dataSource: any;

  constructor(
    private route: Router,
    private CoursesService: CoursesService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.CoursesService.onCourseChanged
      .subscribe((res: any) => {
        this.course = res;
      })
    this.dataSource = this.list.structures;
  }

  addPerson(course) {
    this.route.navigate(['courses/students/' + this.list.year + '/' + course.grade]);
  }

  addSubject(Actiontype) {
    this.openDialog(Actiontype, null);
  }

  editSubject(data) {
    this.openDialog('edit', data);
  }

  deletesubject(data) {

    const index: number = this.dataSource.indexOf(data);
    if (index !== -1) {
      this.dataSource.splice(index, 1);
      this.list.structures = this.dataSource;
      this.CoursesService.courseSubjectEdit(this.list);
    }
  }

  openDialog(Actiontype, data) {
    let body = {
      actiontype: Actiontype,
      data: data
    }
    const dialogRef = this.dialog.open(SubjectdialogComponent, {
      width: '300px',
      data: body
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result._id) {
          let x = 0;
          this.dataSource.forEach(item => {
            if (item._id === result._id) {
              this.dataSource[x] = result;
            }
            x += 1;
          });

        } else {
          result.seq = this.dataSource.length + 1;
          this.dataSource.push(result);
        }
        this.list.structures = this.dataSource;
        this.CoursesService.courseSubjectEdit(this.list);
      }
    });
  }

}




