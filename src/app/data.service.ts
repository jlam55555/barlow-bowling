import { Injectable } from '@angular/core';
import bowlers from './data';
import { Bowler } from './bowler';

@Injectable()
export class DataService {

  constructor() {
    
    // sort bowlers
    bowlers.sort((bowler1, bowler2) => 
      bowler1.name.split(' ').slice(-1)[0].localeCompare(bowler2.name.split(' ').slice(-1)[0])
    );
    
    // get last three dates (for Varsity fitness, below)
    let allDates = [];
    
    // set dates for bowlers and fill in blank scores
    bowlers.forEach((bowler, index, array) => {
      bowlers[index].dates = Object.keys(bowler.scores);
      allDates = allDates.concat(bowlers[index].dates);
      
      Object.keys(bowlers[index].scores).forEach(score => {
        if(bowlers[index].scores[score].length < 3) {
          let remaining = 3-bowlers[index].scores[score].length;
          for(let i = 0; i < remaining; i++) {
            bowlers[index].scores[score].push('');
          }
        }
      });
    });
    
    // remove duplicates and get last three
    let lastThreeMatches = 
      Array.from(new Set(allDates))
        .sort((date1, date2) => new Date(date1).getTime() - new Date(date2).getTime())
        .slice(-3);
    
    // calculate Varsity fitness scores
    // a formula for this can be found at jbhsbowling.github.io/about/team or at /assets/varsityCalculation.tex
    bowlers.forEach((bowler: Bowler) => {
      let weight = 1.5;
      let weightedScoreTotal = 0;
      let weightTotal = 0;
      let match = 0;
      let scoreTotal = 0;
      let gameTotal = 0;
      
      bowler.dates.forEach(date => {
        let matchWeight = Math.pow(1.5, match);
        
        bowler.scores[date].forEach(score => {
          if(score == '') return;
          
          // calculate weighted average total
          weightedScoreTotal += score * matchWeight;
          weightTotal += matchWeight;
          
          // calculate regular average
          scoreTotal += score;
          gameTotal++;
        });
        
        match++;
      });
      
      // set regular average
      bowler.average = Number(Number(scoreTotal / gameTotal).toFixed(2));
      
      // calculate weighted average
      let weightedAverage = weightedScoreTotal / weightTotal;
      
      // calculate number of games played out of last nine
      // TODO: edit this to work before three matches are completed
      let lastThreeMatchesGames = 0;
      lastThreeMatches.forEach(date => {
        lastThreeMatchesGames += bowler.scores[date] ? bowler.scores[date].filter(score => score !== '').length : 0;
      });
      let lastThreeMatchesPercentage = lastThreeMatchesGames / 9;
      
      // bowler Varsity fitness score = weightedAVerage * lastThreeMatchesPercentage
      bowler.varsityScore = Number(Number(weightedAverage * lastThreeMatchesPercentage).toFixed(2));
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
