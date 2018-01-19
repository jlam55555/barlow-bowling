import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { BowlerComponent } from '../bowler/bowler.component';
import { GalleryComponent } from '../gallery/gallery.component';

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'bowlers/:bowler', component: BowlerComponent },
  { path: 'bowlers', component: BowlerComponent },
  { path: 'gallery', component: GalleryComponent }
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
