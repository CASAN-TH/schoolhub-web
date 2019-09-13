import { NgModule } from '@angular/core';
import { AdmissionsComponent } from './admissions.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { AuthenGuardService } from 'app/authentication/authen-guard.service';
import { AdmissionsService } from './admissions.service';

const routes = [
  {
    path: '',
    component: AdmissionsComponent,
    canActivate: [AuthenGuardService],
    resolve: {
      admissions: AdmissionsService
    }
  }
];

@NgModule({
  declarations: [AdmissionsComponent],
  imports: [
    RouterModule.forChild(routes),

    TranslateModule,

    FuseSharedModule
  ],
  exports: [
    AdmissionsComponent
  ]
})
export class AdmissionsModule { }
