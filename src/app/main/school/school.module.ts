import { NgModule } from '@angular/core';
import { SchoolComponent } from './school.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { AuthenGuardService } from 'app/authentication/authen-guard.service';

const routes = [
  {
      path     : '**',
      component: SchoolComponent,
      canActivate: [AuthenGuardService]
  }
];

@NgModule({
  declarations: [SchoolComponent],
  imports: [
    RouterModule.forChild(routes),

    TranslateModule,

    FuseSharedModule
  ],
  exports: [
    SchoolComponent
  ]
})
export class SchoolModule { }
