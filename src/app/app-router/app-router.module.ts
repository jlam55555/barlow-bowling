import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { BowlerComponent } from '../bowler/bowler.component';
import { GalleryComponent } from '../gallery/gallery.component';

import { AboutComponent } from '../about/about.component';
import { TeamComponent } from '../about/team/team.component';
import { LeagueComponent } from '../about/league/league.component';
import { ContactComponent } from '../about/contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'bowlers', component: BowlerComponent },
  { path: 'bowlers/:bowler', component: BowlerComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'about', component: AboutComponent },
  { path: 'about/team', component: TeamComponent },
  { path: 'about/league', component: LeagueComponent },
  { path: 'about/contact', component: ContactComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouterModule { }
