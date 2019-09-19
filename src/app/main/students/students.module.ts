import { NgModule } from '@angular/core';
import { StudentsComponent } from './students.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { AuthenGuardService } from 'app/authentication/authen-guard.service';
import { StudentsService } from './students.service';
import { StudentsFormComponent } from './students-form/students-form.component';
import { MatInputModule, MatIconModule, MatTableModule, MatMenuModule, MatButtonModule, MatToolbarModule, MatFormFieldModule, MatDatepickerModule, MatCardModule, MatSelectModule, MatPaginatorModule, MatCheckboxModule } from '@angular/material';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { StudentsDialogComponent } from './students-dialog/students-dialog.component';


const routes = [
  {
    path: '',
    component: StudentsComponent,
    canActivate: [AuthenGuardService],
    resolve: {
      students: StudentsService
    }
  }, {
    path: ':studentsId',
    component: StudentsFormComponent,
    canActivate: [AuthenGuardService],
    resolve: {
      student: StudentsService
    }
  }
];

@NgModule({
  declarations: [StudentsComponent, StudentsFormComponent, StudentsDialogComponent],
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
    StudentsComponent
  ],
  entryComponents: [StudentsDialogComponent]
})
export class StudentsModule { }
