import { NgModule } from '@angular/core';
import { CoursesComponent } from './courses.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { AuthenGuardService } from 'app/authentication/authen-guard.service';
import { CoursesService } from './courses.service';
import { MatIconModule } from '@angular/material';
import { CourseslistComponent } from './courseslist/courseslist.component';
import { CourseComponent } from './courseslist/course/course.component';

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
  }
];

@NgModule({
  declarations: [
    CoursesComponent,
    CourseslistComponent,
    CourseComponent],
  imports: [
    RouterModule.forChild(routes),
    MatIconModule,

    TranslateModule,

    FuseSharedModule
  ],
  exports: [
    CoursesComponent
  ]
})
export class CoursesModule { }
