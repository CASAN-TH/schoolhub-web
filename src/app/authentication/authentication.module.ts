import { NgModule } from '@angular/core';
import { LoginModule } from 'app/authentication/login/login.module';
import { RegisterModule } from 'app/authentication/register/register.module';
import { ForgotPasswordModule } from 'app/authentication/forgot-password/forgot-password.module';
import { ResetPasswordModule } from 'app/authentication/reset-password/reset-password.module';
import { LockModule } from 'app/authentication/lock/lock.module';
import { MailConfirmModule } from 'app/authentication/mail-confirm/mail-confirm.module';

@NgModule({
  declarations: [],
  imports: [
    LoginModule,
    RegisterModule,
    ForgotPasswordModule,
    ResetPasswordModule,
    LockModule,
    MailConfirmModule
  ]
})
export class AuthenticationModule { }
