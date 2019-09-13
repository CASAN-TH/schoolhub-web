import { NgModule } from '@angular/core';
import { AdmissionsComponent } from './admissions.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { AuthenGuardService } from 'app/authentication/authen-guard.service';
import { AdmissionsService } from './admissions.service';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { MatInputModule, MatIconModule, MatTableModule, MatPaginatorModule, MatMenuModule, MatButtonModule, MatToolbarModule, MatFormFieldModule, MatDatepickerModule, MatCardModule, MatSelectModule } from '@angular/material';

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
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCardModule,
    MatSelectModule,


    TranslateModule,

    FuseSharedModule,
    FuseConfirmDialogModule,
    FuseSidebarModule
  ],
  exports: [
    AdmissionsComponent
  ]
})
export class AdmissionsModule { }
