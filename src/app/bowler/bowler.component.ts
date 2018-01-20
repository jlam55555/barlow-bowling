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
  public closed: boolean = true;
  
  @ViewChild('scoresChart') scoresChart: ElementRef;

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
        // update crumbs
        this.titleService.setCrumbs([
          { path: '/', text: '<i class="fas fa-home"></i> Home' },
          { path: '/bowlers', text: '<i class="fas fa-users"></i> Bowlers' },
          { path: `/bowlers/${this.selectedBowler.name}`, text: '<i class="fas fa-user"></i> ' + this.selectedBowler.name }
        ]);
        
        // update scores chart
        this.updateChart();
        
        // if list open on mobile close it
        if(!this.closed && window.screen.width < 1024) {
          this.toggleClosed();
        }
      } else {
        this.titleService.setCrumbs([
          { path: '/', text: '<i class="fas fa-home"></i> Home' },
          { path: '/bowlers', text: '<i class="fas fa-users"></i> Bowlers' }
        ]); 
        
        // if list closed on mobile open it
        if(this.closed && window.screen.width < 1024) {
          this.toggleClosed();
        }
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
    if(!this.scoresChart) return;
    
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
      label: 'Game1',
      backgroundColor: 'white',
      lineTension: 0.1,
      showLine: false,
      fill: false
    };
    let datasets = [
      Object.assign({}, dataset, {
        label: 'Game 1', data: firstGames, borderColor: 'red'
      }),
      Object.assign({}, dataset, {
        label: 'Game 2', data: secondGames, borderColor: 'green'
      }),
      Object.assign({}, dataset, {
        label: 'Game 3', data: thirdGames, borderColor: 'blue'
      }),
      Object.assign({}, dataset, {
        label: 'Average', data: gameAverages, borderColor: 'black', showLine: true
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
        responsive: true,
        title: {
          display: true,
          text: `${this.selectedBowler.name}'s Scores`
        },
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

  // whether or not the menu is closed
  public toggleClosed(): void {
    this.closed = !this.closed;
    this.cookieService.put('bowlerListClosed', this.closed.toString());
  }
  public closeIfMobile(): void {
    if(!closed && window.screen.width <= 1024) {
       this.toggleClosed();
    }
  }

}
