import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../title.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private titleService: TitleService) { }

  ngOnInit() {
    this.titleService.setCrumbs([
      { path: '/', text: '<i class="fas fa-home"></i> Home' },
      { path: '/about', text: '<i class="fas fa-info-circle"></i> About' },
      { path: '/about', text: '<i class="fas fa-address-card"></i> Contact' }
    ]);
  }

}
