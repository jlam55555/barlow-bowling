import { Component, OnInit } from '@angular/core';
import imageData from '../gallery';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  public images: Object[] = imageData;
  public selectedImage: Object = imageData[0];

  constructor(private titleService: TitleService) {
    titleService.setCrumbs([
      { path: '', text: '<i class="fas fa-home"></i> Home' },
      { path: 'gallery', text: '<i class="fas fa-images"></i> Gallery' }
    ]);
  }

  ngOnInit() {
    
  }

}
