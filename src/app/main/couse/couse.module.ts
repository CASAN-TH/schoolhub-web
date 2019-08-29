import { NgModule } from '@angular/core';
import { CouseComponent } from './couse.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { AuthenGuardService } from 'app/authentication/authen-guard.service';

const routes = [
  {
      path     : '**',
      component: CouseComponent,
      canActivate: [AuthenGuardService]
  }
];

@NgModule({
  declarations: [CouseComponent],
  imports: [
    RouterModule.forChild(routes),

    TranslateModule,

    FuseSharedModule
  ],
  exports: [
    CouseComponent
  ]
})
export class CouseModule { }
