import { NgModule } from '@angular/core';
import { SchoolComponent } from './school.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatInputModule, MatIconModule, MatTableModule, MatPaginatorModule, MatMenuModule, MatButtonModule, MatToolbarModule, MatFormFieldModule, MatCardModule} from '@angular/material';
import { NgxFileDropModule } from 'ngx-file-drop';
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
