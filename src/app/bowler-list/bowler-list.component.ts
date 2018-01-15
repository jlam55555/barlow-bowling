import { Component, OnInit } from '@angular/core';
import { Bowler } from '../bowler';
import { DataService } from '../data.service';

@Component({
  selector: 'app-bowler-list',
  templateUrl: './bowler-list.component.html',
  styleUrls: ['./bowler-list.component.scss']
})
export class BowlerListComponent implements OnInit {

  public bowlers: Bowler[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.bowlers = this.dataService.getBowlers();
  }

}
