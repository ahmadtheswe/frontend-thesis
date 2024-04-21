import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ImageService} from "../../service/image-service/image.service";
import {Image} from "../../model/dto/entity/Image";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {SecurityService} from "../../service/security-service/security.service";

@Component({
  selector: 'app-images-menu',
  templateUrl: './images-menu.component.html',
  styleUrls: ['./images-menu.component.scss']
})
export class ImagesMenuComponent implements AfterViewInit, OnInit, OnDestroy {

  images: Image[] = [];


  pageSize: number = 5;
  pageIndex: number = 0;
  title?: string;
  radius?: number;
  latitude?: number;
  longitude?: number;


  useCoordinateSearch: boolean = true;

  subscription: Subscription = new Subscription();

  selectedImage: Image = new Image();

  constructor(
    private imageService: ImageService,
    private securityService: SecurityService,
    private router: Router
  ) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadImagesData(this.pageSize, this.pageIndex, 'id', this.title, this.latitude, this.longitude, this.radius);
  }


  ngAfterViewInit(): void {
    this.loadImagesData(this.pageSize, this.pageIndex, 'id', this.title, this.latitude, this.longitude, this.radius);
  }

  gotoImagePage(image: Image): void {
    this.imageService.storeImageId(image);
    this.router.navigate(['images', 'detail'], {state: image});
  }

  canAccessImage(image: Image) {
    if (image.productLevel === "FREE" || this.securityService.getRole() === "admin")
      return true;

    if (this.securityService.getSubscriptionLevel() === "PREMIUM") {
      return true;
    } else if (this.securityService.getSubscriptionLevel() === "PRO") {
      return image.productLevel !== "PREMIUM";
    } else {
      return image.productLevel === "FREE";
    }
  }

  setupPopupData(image: Image) {
    this.selectedImage = image;
  }

  loadImagesData(size: number, page: number, sortBy: string,
                 title?: string, latitude?: number, longitude?: number, radius?: number): void {
    this.subscription.add(this.imageService.getImagesPagination(size, page, sortBy, title, latitude, longitude, radius).subscribe({
      next: response => {
        if (response && response.data) {
          this.images = response.data;
        }
      },
      error: error => {
        console.error('Error fetching images:', error);
      }
    }));
  }

  onSubmitFilter(): void {
    // Reset the paginator to the first page
    // this.paginator.firstPage();

    // Call loadImagesData with the current form values
    this.loadImagesData(this.pageSize, 0, 'id', this.title, this.latitude, this.longitude, this.radius);
  }

  handleLatLongClicked(event: { lat?: number, lng?: number }): void {
    this.latitude = event.lat;
    this.longitude = event.lng;
  }

  upgradeSubscription(packageLevel: string) {
    this.router.navigate(['upgrade', packageLevel],);
  }

}
