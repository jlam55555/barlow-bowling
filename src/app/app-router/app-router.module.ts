import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { BowlerListComponent } from '../bowler-list/bowler-list.component';
import { BowlerDetailComponent } from '../bowler-detail/bowler-detail.component';

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'bowlers/:bowler', component: BowlerDetailComponent },
  { path: 'bowlers', component: BowlerListComponent }
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
