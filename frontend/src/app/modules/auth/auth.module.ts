import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SignInComponent } from './components/sign-in/sign-in.component';



@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AuthModule { }
