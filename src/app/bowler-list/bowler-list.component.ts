import { Component, OnInit } from '@angular/core';
import { Bowler } from '../bowler';
import { DataService } from '../data.service';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-bowler-list',
  templateUrl: './bowler-list.component.html',
  styleUrls: ['./bowler-list.component.scss']
})
export class BowlerListComponent implements OnInit {

  public bowlers: Bowler[];

  constructor(
    private dataService: DataService,
    private titleService: TitleService
  ) { }

  ngOnInit() {
    this.bowlers = this.dataService.getBowlers();
    this.titleService.setCrumbs([
      { path: '/', text: 'Home' },
      { path: '/bowlers', text: 'Bowlers' }
    ]);
  }

}
