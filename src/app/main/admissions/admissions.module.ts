import { NgModule } from '@angular/core';
import { AdmissionsComponent } from './admissions.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { AuthenGuardService } from 'app/authentication/authen-guard.service';
import { AdmissionsService } from './admissions.service';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { MatInputModule, MatIconModule, MatTableModule, MatPaginatorModule, MatMenuModule, MatButtonModule, MatToolbarModule, MatFormFieldModule, MatDatepickerModule, MatCardModule, MatSelectModule, MatCheckboxModule } from '@angular/material';
import { AdmissionsFormComponent } from './admissions-form/admissions-form.component';

const routes = [
  {
    path: '',
    component: AdmissionsComponent,
    canActivate: [AuthenGuardService],
    resolve: {
      admissions: AdmissionsService
    }
  },
  {
    path: ':admissionsId',
    component: AdmissionsFormComponent,
    canActivate: [AuthenGuardService],
    resolve: {
      admission: AdmissionsService
    }
  }
];

@NgModule({
  declarations: [AdmissionsComponent, AdmissionsFormComponent],
  imports: [
    RouterModule.forChild(routes),

    MatCheckboxModule,
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
