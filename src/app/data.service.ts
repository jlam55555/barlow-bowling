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
    
    bowlers.forEach((bowler, index, array) => {
      bowlers[index].dates = Object.keys(bowler.scores);
      
      Object.keys(bowlers[index].scores).forEach(score => {
        if(bowlers[index].scores[score].length < 3) {
          let remaining = 3-bowlers[index].scores[score].length;
          for(let i = 0; i < remaining; i++) {
            bowlers[index].scores[score].push('');
          }
        }
      });
    });
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
