import { NgModule } from '@angular/core';
import { StudentsComponent } from './students.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { AuthenGuardService } from 'app/authentication/authen-guard.service';

const routes = [
  {
      path     : '**',
      component: StudentsComponent,
      canActivate: [AuthenGuardService]
  }
];

@NgModule({
  declarations: [StudentsComponent],
  imports: [
    RouterModule.forChild(routes),

    TranslateModule,

    FuseSharedModule
  ],
  exports: [
    StudentsComponent
  ]
})
export class StudentsModule { }
