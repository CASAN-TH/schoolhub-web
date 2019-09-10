import { NgModule } from '@angular/core';
import { StudentsComponent } from './students.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { AuthenGuardService } from 'app/authentication/authen-guard.service';
import { StudentsService } from './students.service';
import { StudentsFormComponent } from './students-form/students-form.component';
import { MatInputModule, MatIconModule, MatTableModule, MatMenuModule, MatButtonModule, MatToolbarModule, MatFormFieldModule, MatDatepickerModule, MatCardModule } from '@angular/material';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';

const routes = [
  {
      path     : '**',
      component: StudentsComponent,
      canActivate: [AuthenGuardService],
      resolve: {
        students:StudentsService
      }
  }
];

@NgModule({
  declarations: [StudentsComponent, StudentsFormComponent],
  imports: [
    RouterModule.forChild(routes),

    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCardModule,

    TranslateModule,

    FuseSharedModule,
    FuseConfirmDialogModule,
    FuseSidebarModule
  ],
  exports: [
    StudentsComponent
  ]
})
export class StudentsModule { }
