import { Component, OnInit } from '@angular/core';
import { Bowler } from '../bowler';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { TitleService } from '../title.service';

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
    private route: ActivatedRoute
  ) { }

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
  }

}
