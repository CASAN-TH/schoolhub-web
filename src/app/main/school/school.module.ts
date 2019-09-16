import { NgModule } from '@angular/core';
import { SchoolComponent } from './school.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { AuthenGuardService } from 'app/authentication/authen-guard.service';
import { MatInputModule, MatIconModule, MatTableModule, MatPaginatorModule, MatMenuModule, MatButtonModule, MatToolbarModule, MatFormFieldModule} from '@angular/material';

const routes = [
  {
      path     : '**',
      component: SchoolComponent
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
    
  
    TranslateModule,

    FuseSharedModule
  ],
  exports: [
    SchoolComponent
  ]
})
export class SchoolModule { }
