import { Component, OnInit } from '@angular/core';
import { TitleService } from '../title.service';
import { Crumbs } from '../crumbs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public websiteTitle:string = "Barlow Bowling";
  public crumbs:Crumbs[];
  
  constructor(private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.getCrumbs().subscribe(crumbs => this.crumbs = crumbs);
  }

}
