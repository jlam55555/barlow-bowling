import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Bowler } from '../bowler';

@Component({
  selector: 'app-bowler-detail',
  templateUrl: './bowler-detail.component.html',
  styleUrls: ['./bowler-detail.component.scss']
})
export class BowlerDetailComponent implements OnInit {

  public bowler: Bowler;
  
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bowler = this.dataService.getBowler(params['bowler']);
    });
  }

}
