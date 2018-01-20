// import core classes for routing and component
import { ViewChild, Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// import DataService, Bowler for getting data
import { Bowler } from '../bowler';
import { DataService } from '../data.service';

// import TitleService for header
import { TitleService } from '../title.service';

// import CookieService for saving preferred menu orientation
import { CookieService } from 'angular2-cookie/core';

// import chart.js library
import { Chart } from 'chart.js/dist/Chart.bundle.js';

@Component({
  selector: 'app-bowler',
  templateUrl: './bowler.component.html',
  styleUrls: ['./bowler.component.scss']
})
export class BowlerComponent implements OnInit {

  public bowlers: Bowler[];
  public selectedBowler: Bowler;
  public teamBowler: boolean = false;
  public closed: boolean = true;
  
  @ViewChild('scoresChart') scoresChart: ElementRef;
  @ViewChild('teamVarsityChart') teamVarsityChart: ElementRef;

  // colors for charts
  // using the material design colors like the rest of the website
  private colors = {
    RED: 'red',
    WHITE: 'white',
    BLUE: 'blue',
    
    BG:  '#E3F2FD',  // $blue000
    FG1: '#2196F3',  // $blue500
    FG2: '#f44336',  // $red500
    FG3: '#4CAF50',  // $green500
    FG4: '#FF9800'   // $orange500
  };

  constructor(
    private dataService: DataService,
    private titleService: TitleService,
    private route: ActivatedRoute,
    private cookieService: CookieService,
  ) {}

  ngOnInit() {
    
    // get list of bowlers
    this.bowlers = this.dataService.getBowlers();
    
    // on route change
    this.route.params.subscribe(params => {
      
      this.selectedBowler = this.dataService.getBowler(params['bowler']);
      if(this.selectedBowler) {
        // if player
        this.teamBowler = false;

        // update crumbs
        this.titleService.setCrumbs([
          { path: '/', text: '<i class="fas fa-home"></i> Home' },
          { path: '/bowlers', text: '<i class="fas fa-users"></i> Bowlers' },
          { path: `/bowlers/${this.selectedBowler.name}`, text: '<i class="fas fa-user"></i> ' + this.selectedBowler.name }
        ]);

        // if list open on mobile close it
        if(!this.closed && window.screen.width < 1024) {
          this.toggleClosed();
        }

        // update scores chart
        this.updateChart();
      } else {
        // if team
        this.teamBowler = true;

        // update crumbs
        this.titleService.setCrumbs([
          { path: '/', text: '<i class="fas fa-home"></i> Home' },
          { path: '/bowlers', text: '<i class="fas fa-users"></i> Bowlers' },
        ]);

        // if list open on mobile close it
        if(!this.closed && window.screen.width < 1024) {
          this.toggleClosed();
        }

        // update charts
        this.updateTeamCharts();
      }
    });

    // set menu if not on mobile
    if(window.screen.width >= 1024) {
      this.closed = this.cookieService.get('bowlerListClosed') === 'true';
    }
  }

  /* update scores chart on load */
  ngAfterViewInit(): void {        
    this.updateChart();
  }
  // update chart
  public updateChart(): void {
    // only update if bowlers pane is open
    if(!this.scoresChart) {
      setTimeout(() => {
        this.updateChart();
      }, 500);
      return;
    };
    
    // game data
    let firstGames = Object.keys(this.selectedBowler.scores).map(date => this.selectedBowler.scores[date][0]);
    let secondGames = Object.keys(this.selectedBowler.scores).map(date => this.selectedBowler.scores[date][1] || null);
    let thirdGames = Object.keys(this.selectedBowler.scores).map(date => this.selectedBowler.scores[date][2] || null);
    let gameAverages = Object.keys(this.selectedBowler.scores).map(date => {
      let scores = this.selectedBowler.scores[date];
      let sum = scores.reduce((accumulator, score) => score + accumulator);
      return Number(sum / scores.length).toFixed(2);
    });
    
    // datasets
    let dataset = {
      backgroundColor: this.colors.BG,
      lineTension: 0.1,
      showLine: false,
      fill: false
    };
    let datasets = [
      Object.assign({}, dataset, {
        label: 'Game 1', data: firstGames, borderColor: this.colors.FG2
      }),
      Object.assign({}, dataset, {
        label: 'Game 2', data: secondGames, borderColor: this.colors.FG3
      }),
      Object.assign({}, dataset, {
        label: 'Game 3', data: thirdGames, borderColor: this.colors.FG4
      }),
      Object.assign({}, dataset, {
        label: 'Average', data: gameAverages, borderColor: this.colors.FG1, showLine: true
      })
    ];
    
    
    let ctx = this.scoresChart.nativeElement.getContext('2d');
    let config = {
      type: 'line',
      data: {
        labels: this.selectedBowler.dates,
        datasets: datasets
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Score'
            }
          }]
        }
      }
    };
    let chart = new Chart(ctx, config);
    
  } 

  // update team charts
  public updateTeamCharts(): void {
    
    // only update if bowlers pane is open
    if(!this.teamVarsityChart) {
      setTimeout(() => {
        this.updateTeamCharts();
      }, 50);
      return;
    }

    // datasets
    var barColors = new Array(this.bowlers.length)
      .fill(this.colors.FG1, 0, 5)
      .fill(this.colors.BG, 5, this.bowlers.length);
    let dataset = [{
      label: 'Fitness Scores',
      borderColor: this.colors.FG1,
      borderWidth: 1,
      backgroundColor: barColors,
      data: []
    }];
    let sortedBowlers = this.bowlers
      .sort((bowler1, bowler2) => bowler2.varsityScore - bowler1.varsityScore);
    
    sortedBowlers.forEach(bowler => dataset[0].data.push(bowler.varsityScore));
        
    let ctx = this.teamVarsityChart.nativeElement.getContext('2d');
    let config = {
      type: 'bar',
      data: {
        labels: sortedBowlers.map(bowler => bowler.name),
        datasets: dataset
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: 'Team Varsity Fitness Scores'
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Date'
            },
            ticks: {
              autoSkip: false
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Score'
            }
          }]
        }
      }
    };
    let chart = new Chart(ctx, config);
  } 

  // whether or not the menu is closed
  public toggleClosed(): void {
    this.closed = !this.closed;
    this.cookieService.put('bowlerListClosed', this.closed.toString());
  }
  public closeIfMobile(): void {
    if(!closed && window.screen.width < 1024) {
       this.toggleClosed();
    }
  }

}
