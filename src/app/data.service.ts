import { Injectable } from '@angular/core';
import bowlers from './data';
import { Bowler } from './bowler';

@Injectable()
export class DataService {

  // sort bowlers
  constructor() {
    bowlers.sort((bowler1, bowler2) => 
      bowler1.name.split(' ').slice(-1)[0].localeCompare(bowler2.name.split(' ').slice(-1)[0])
    );
  }
  
  // return a list of bowlers
  getBowlers(): Bowler[] {
    return bowlers;
  }
  
  // get specific bowler
  getBowler(name: string): Bowler {
    return bowlers.find(bowler => bowler.name == name);
  }

}
