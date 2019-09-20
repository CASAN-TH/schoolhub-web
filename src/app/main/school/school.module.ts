import { NgModule } from '@angular/core';
import { SchoolComponent } from './school.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { AuthenGuardService } from 'app/authentication/authen-guard.service';
import { MatInputModule, MatIconModule, MatTableModule, MatPaginatorModule, MatMenuModule, MatButtonModule, MatToolbarModule, MatFormFieldModule, MatCardModule} from '@angular/material';
import { NgxFileDropModule } from 'ngx-file-drop';
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
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatCardModule,
    NgxFileDropModule,
    
  
    TranslateModule,

    FuseSharedModule
  ],
  exports: [
    SchoolComponent
  ]
})
export class SchoolModule { }
