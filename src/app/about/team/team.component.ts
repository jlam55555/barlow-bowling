import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../title.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  constructor(private titleService: TitleService) { }

  ngOnInit() {
    this.titleService.setCrumbs([
      { path: '/', text: '<i class="fas fa-home"></i> Home' },
      { path: '/about', text: '<i class="fas fa-info-circle"></i> About' },
      { path: '/about', text: '<i class="fas fa-users"></i> Team' }
    ]);
  }

}
