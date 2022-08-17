import { OverviewModule } from './modules/overview/overview.module';
import { UserModule } from './modules/user/user.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const modules = [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UserModule,
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ...modules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
