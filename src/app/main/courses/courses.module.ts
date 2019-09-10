import { NgModule } from '@angular/core';
import { CoursesComponent } from './courses.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { AuthenGuardService } from 'app/authentication/authen-guard.service';
import { CoursesService } from './courses.service';
import { MatIconModule, MatMenuModule } from '@angular/material';
import { CourseslistComponent } from './courseslist/courseslist.component';
import { CourseComponent } from './courseslist/course/course.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { OrderModule } from 'ngx-order-pipe';
import { StudentsComponent } from './courseslist/students/students.component';

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
  }
];

@NgModule({
  declarations: [
    CoursesComponent,
    CourseslistComponent,
    CourseComponent,
    StudentsComponent],
  imports: [
    RouterModule.forChild(routes),
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatMenuModule,

    OrderModule,

    TranslateModule,

    FuseSharedModule
  ],
  exports: [
    CoursesComponent
  ]
})
export class CoursesModule { }
