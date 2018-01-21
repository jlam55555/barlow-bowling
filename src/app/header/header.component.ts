import { Component, OnInit } from '@angular/core';
import { TitleService } from '../title.service';
import { Crumbs } from '../crumbs';

// font awesome
import fontawesome from '@fortawesome/fontawesome/index.es';
import icons from '@fortawesome/fontawesome-free-solid';
fontawesome.library.add(icons);

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public websiteTitle:string = 'Barlow Bowling';
  public crumbs:Crumbs[];
  public webapp:boolean = false;
  
  constructor(private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.getCrumbs().subscribe(crumbs => this.crumbs = crumbs);
    
    // simple way to check if mobile and in portrait mode
    if(window.screen.width < 1024 && window.screen.width < window.screen.height) {
      this.webapp = true;
    }
  }

}
