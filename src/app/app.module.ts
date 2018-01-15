import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BowlerComponent } from './bowler/bowler.component';
import { AboutComponent } from './about/about.component';
import { AppRouterModule } from './app-router/app-router.module';

import { DataService } from './data.service';
import { TitleService } from './title.service'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BowlerComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule
  ],
  providers: [
    DataService,
    TitleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
