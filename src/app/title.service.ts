import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Crumbs } from './crumbs';

@Injectable()
export class TitleService {

  //private title: string;
  private crumbs: Crumbs[] = [
    { path: '/', text: 'Home' }
  ];
  
  constructor() {}

  // crumb getter
  getCrumbs(): Observable<Crumbs[]> {
    return of(this.crumbs);
  }

  // crumb setter
  setCrumbs(crumbs: Crumbs[]): void {
    this.crumbs = crumbs;
  }

}
