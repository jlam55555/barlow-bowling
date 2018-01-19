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
      { path: '', text: 'Home' },
      { path: 'gallery', text: 'Gallery' }
    ]);
  }

  selectImage(image: Object) {
    this.selectedImage = image;
  }

  changeImage(image: Object, previous: boolean = true) {
    let index = this.images.indexOf(image);
    
    // quick fix for modulus from https://stackoverflow.com/a/4467559/2397327
    // TODO: don't need this
    function mod(n, m) {
      return ((n % m) + m) % m;
    }
    
    this.selectedImage = this.images[mod(index + (previous ? -1 : 1), this.images.length)];
  }

  ngOnInit() {
  }

}
