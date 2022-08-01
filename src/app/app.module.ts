import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';
import { LogoComponent } from './components/ui/logo/logo.component';
import { SignInComponent } from './components/sign-in-page/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-in-page/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInPageComponent,
    LogoComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
