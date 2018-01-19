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
    
    let scoresCtx = this.scoresChart.nativeElement.getContext('2d');
    var data = {
      labels: ["Value A","Value B"],
      datasets: [{
        "data": [101342, 55342], // Example data
        "backgroundColor": ["#1fc8f8", "#76a346"]
      }]
    };
    var chart = new Chart(
      scoresCtx, {
        "type": 'doughnut',
        "data": data,
        "options": {
          "cutoutPercentage": 50,
          "animation": {
            "animateScale": true,
            "animateRotate": false
          }
        }
      }
    );
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
