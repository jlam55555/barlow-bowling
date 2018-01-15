import { Injectable } from '@angular/core';
import bowlers from './data';
import { Bowler } from './bowler';

@Injectable()
export class DataService {

  // return a list of bowlers
  getBowlers(): Bowler[] {
    return bowlers;
  }
  
  // get specific bowler
  getBowler(name: string): Bowler {
    return bowlers.find(bowler => bowler.name == name);
  }

}
