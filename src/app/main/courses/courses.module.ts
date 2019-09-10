import { NgModule } from '@angular/core';
import { CoursesComponent } from './courses.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { AuthenGuardService } from 'app/authentication/authen-guard.service';

const routes = [
  {
      path     : '**',
      component: CoursesComponent,
      canActivate: [AuthenGuardService]
  }
];

@NgModule({
  declarations: [CoursesComponent],
  imports: [
    RouterModule.forChild(routes),

    TranslateModule,

    FuseSharedModule
  ],
  exports: [
    CoursesComponent
  ]
})
export class CoursesModule { }
