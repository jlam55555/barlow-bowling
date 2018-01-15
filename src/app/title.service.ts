import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of } from 'rxjs/observable/of';
import { Crumbs } from './crumbs';

@Injectable()
export class TitleService {

  private crumbs: Crumbs[];
  private changesSubject: BehaviorSubject<Crumbs[]> = new BehaviorSubject<Crumbs[]>;
  
  // crumb getter
  getCrumbs(): BehaviorSubject<Crumbs[]> {
    return this.changesSubject;
  }

  // crumb setter
  setCrumbs(crumbs: Crumbs[]): void {
    this.changesSubject.next(crumbs);
    this.crumbs = crumbs;
  }

}
