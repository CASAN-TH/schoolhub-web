import { GlobalErrorHandler } from './global-error-handler';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule, MatSnackBarModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';

import { ServerErrorInterceptor } from './server-error.interceptor';

const appRoutes: Routes = [
    {
        path        : 'auth',
        loadChildren: './authentication/authentication.module#AuthenticationModule'
    },
    {
        path        : 'admissions',
        loadChildren: './main/admissions/admissions.module#AdmissionsModule'
    },
    {
        path        : 'students',
        loadChildren: './main/students/students.module#StudentsModule'
    },
    {
        path        : 'courses',
        loadChildren: './main/courses/courses.module#CoursesModule'
    },
    {
        path        : 'school',
        loadChildren: './main/school/school.module#SchoolModule'
    },
    {
        path      : '**',
        redirectTo: 'admissions'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule
    ],
    providers: [
      { provide: ErrorHandler, useClass: GlobalErrorHandler },
      { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true }
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
