import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { CookieService } from 'angular2-cookie/services/cookies.service';
//import { CookieOptions } from 'angular2-cookie'
import { CookieService, CookieOptions } from 'angular2-cookie/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BowlerComponent } from './bowler/bowler.component';
import { AboutComponent } from './about/about.component';
import { AppRouterModule } from './app-router/app-router.module';

import { DataService } from './data.service';
import { TitleService } from './title.service';
import { AveragePipe } from './average.pipe';
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './about/team/team.component';
import { LeagueComponent } from './about/league/league.component';
import { ContactComponent } from './about/contact/contact.component'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BowlerComponent,
    AboutComponent,
    AveragePipe,
    GalleryComponent,
    HomeComponent,
    TeamComponent,
    LeagueComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule
  ],
  providers: [
    DataService,
    TitleService,
    CookieService,
    { provide: CookieOptions, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
