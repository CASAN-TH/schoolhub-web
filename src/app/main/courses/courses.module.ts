import { NgModule } from '@angular/core';
import { CoursesComponent } from './courses.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { AuthenGuardService } from 'app/authentication/authen-guard.service';
import { CoursesService } from './courses.service';
import {
  MatIconModule,
  MatButtonModule,
  MatBadgeModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import { CourseslistComponent } from './courseslist/courseslist.component';
import { CourseComponent } from './courseslist/course/course.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { OrderModule } from 'ngx-order-pipe';
import { StudentsComponent } from './courseslist/students/students.component';
import { CdkTableModule } from '@angular/cdk/table';
import { SubjectdialogComponent } from './courseslist/course/subjectdialog/subjectdialog.component';
import { MatDialogModule } from '@angular/material/dialog';


const routes = [
  {
    path: '',
    component: CoursesComponent,
    canActivate: [AuthenGuardService],
    resolve: {
      courses: CoursesService
    }
  },
  {
    path: 'courseslist/:actiontype/:year',
    component: CourseslistComponent,
    canActivate: [AuthenGuardService],
    resolve: {
      courses: CoursesService
    }
  },
  {
    path: 'students/:year/:grade',
    component: StudentsComponent,
    canActivate: [AuthenGuardService],
    resolve: {
      courses: CoursesService
    }
  }
];

@NgModule({
  declarations: [
    CoursesComponent,
    CourseslistComponent,
    CourseComponent,
    StudentsComponent,
    SubjectdialogComponent],
  imports: [
    RouterModule.forChild(routes),
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatBadgeModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CdkTableModule,

    OrderModule,

    TranslateModule,

    FuseSharedModule
  ],
  entryComponents: [
    SubjectdialogComponent
  ],
  exports: [
    CoursesComponent
  ]
})
export class CoursesModule { }
