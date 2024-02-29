import {Component, OnDestroy, OnInit} from '@angular/core';
import {ImageService} from "../../../service/image-service/image.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit, OnDestroy {

  imageId: string = "";
  subscription: Subscription = new Subscription();

  constructor(private imageService: ImageService) {

  }

  ngOnInit(): void {
    this.imageId = this.imageService.getImageId();
    console.log(this.imageId);
  }

  ngOnDestroy(): void {
    this.imageService.removeImageId();
    this.subscription.unsubscribe();
  }

  downloadImage() {
    this.subscription.add(this.imageService.regularDownloadImage(this.imageId).subscribe(blob => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.target = '_blank';
      link.click();
    }));
  }
}
