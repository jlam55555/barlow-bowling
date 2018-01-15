import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BowlerListComponent } from './bowler-list/bowler-list.component';
import { BowlerDetailComponent } from './bowler-detail/bowler-detail.component';
import { AboutComponent } from './about/about.component';
import { AppRouterModule } from './app-router/app-router.module';

import { DataService } from './data.service';
import { TitleService } from './title.service'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BowlerListComponent,
    BowlerDetailComponent,
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
