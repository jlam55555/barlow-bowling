import { Component, OnInit } from '@angular/core';
import { Bowler } from '../bowler';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { TitleService } from '../title.service';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-bowler',
  templateUrl: './bowler.component.html',
  styleUrls: ['./bowler.component.scss']
})
export class BowlerComponent implements OnInit {

  public bowlers: Bowler[];
  public selectedBowler: Bowler;

  constructor(
    private dataService: DataService,
    private titleService: TitleService,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.bowlers = this.dataService.getBowlers();
    this.titleService.setCrumbs([
      { path: '/', text: 'Home' },
      { path: '/bowlers', text: 'Bowlers' }
    ]);
    this.route.params.subscribe(params => {
      this.selectedBowler = this.dataService.getBowler(params['bowler']);
      if(this.selectedBowler) {
        this.titleService.setCrumbs([
          { path: '/', text: 'Home' },
          { path: '/bowlers', text: 'Bowlers' },
          { path: `/bowlers/${this.selectedBowler.name}`, text: this.selectedBowler.name }
        ]);
      } else {
        this.titleService.setCrumbs([
          { path: '/', text: 'Home' },
          { path: '/bowlers', text: 'Bowlers' }
        ]); 
      }
    });

    this.closed = window.screen.width < 1024 && this.cookieService.get('bowlerListClosed') === 'true';
  }

  // whether or not the menu is closed
  public closed: boolean;
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
