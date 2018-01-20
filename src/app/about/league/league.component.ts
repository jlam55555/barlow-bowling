import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../title.service';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit {

  constructor(private titleService: TitleService) { }

  ngOnInit() {
    this.titleService.setCrumbs([
      { path: '/', text: '<i class="fas fa-home"></i> Home' },
      { path: '/about', text: '<i class="fas fa-info-circle"></i> About' },
      { path: '/about', text: '<i class="fas fa-map"></i> League' }
    ]);
  }

}
