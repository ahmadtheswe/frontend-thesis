import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {TestingService} from "../../service/testing-service/testing.service";
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
  displayedColumns: string[] = ['preview', 'title', 'coordinate', 'bundle', 'view'];

  totalItems: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  title?: string;
  latitude?: number;
  longitude?: number;


  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  dataSource: MatTableDataSource<Image> = new MatTableDataSource<Image>();
  useCoordinateSearch: boolean = true;

  subscription: Subscription = new Subscription();

  selectedImage: Image = new Image();

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private testingService: TestingService,
    private imageService: ImageService,
    private securityService: SecurityService,
    private router: Router
  ) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadImagesData(this.pageSize, this.pageIndex, 'id', this.title, this.latitude, this.longitude);
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
                 title?: string, latitude?: number, longitude?: number): void {
    this.subscription.add(this.imageService.getImagesPagination(size, page, sortBy, title, latitude, longitude).subscribe({
      next: response => {
        if (response && response.data) {
          this.dataSource.data = response.data;
          this.totalItems = response.paginationInfo?.totalItems!;
          this.pageIndex = response.paginationInfo?.currentPage!;
          this.pageSize = response.paginationInfo?.pageSize!;
          // this.paginator.length = this.totalItems;
          // this.paginator.pageSize = this.pageSize;
          // this.paginator.pageSizeOptions = this.pageSizeOptions;
          // this.paginator.pageIndex = this.currentPage;

          this.dataSource.paginator = this.paginator;

          console.log('paginator: ', this.paginator);
        }
      },
      error: error => {
        console.error('Error fetching images:', error);
      }
    }));
  }

  onPageChange(event: any): void {
    // this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.totalItems = event.length;
    console.log('Page size:', this.pageSize);
    console.log('Current page:', this.pageIndex);
    const sortBy = 'id'; // You can adjust this as needed

    this.loadImagesData(this.pageSize, this.pageIndex, sortBy, this.title, this.latitude, this.longitude);
  }

  onSubmitFilter(): void {
    // Reset the paginator to the first page
    this.paginator.firstPage();

    // Call loadImagesData with the current form values
    this.loadImagesData(this.pageSize, 0, 'id', this.title, this.latitude, this.longitude);
  }

  handleLatLongClicked(event: { lat?: number, lng?: number }): void {
    this.latitude = event.lat;
    this.longitude = event.lng;
  }

  upgradeSubscription(packageLevel: string) {
    this.router.navigate(['upgrade', packageLevel],);
  }

}
