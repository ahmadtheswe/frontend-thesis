import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {TestingService} from "../../service/testing-service/testing.service";
import {ImageService} from "../../service/image-service/image.service";
import {Image} from "../../model/dto/entity/Image";
import {PaginationResponse} from "../../model/dto/response/PaginationResponse";

@Component({
  selector: 'app-images-menu',
  templateUrl: './images-menu.component.html',
  styleUrls: ['./images-menu.component.scss']
})
export class ImagesMenuComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['preview', 'title', 'price-idr', 'coordinate', 'view'];
  totalItems: number = 0;
  pageSize: number = 5;
  currentPage: number = 0;
  title?: string;
  latitude?: number;
  longitude?: number;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  dataSource: MatTableDataSource<Image> = new MatTableDataSource<Image>();
  useCoordinateSearch: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private testingService: TestingService,
    private imageService: ImageService
  ) {
  }

  ngOnInit(): void {
    this.loadImagesData(this.pageSize, this.currentPage, 'id', this.title, this.latitude, this.longitude);
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  testingApi(): void {
    this.testingService.testingApi().subscribe((value) => {
      console.log(value);
    })
  }

  loadImagesData(size: number, page: number, sortBy: string,
                 title?: string, latitude?: number, longitude?: number): void {
    this.imageService.getImagesPagination(size, page, sortBy, title, latitude, longitude).subscribe(
      (response: PaginationResponse<Image>) => {
        if (response && response.data) {
          this.dataSource.data = response.data; // Assign the fetched data to the data source
          this.totalItems = response.paginationInfo?.totalItems!;
          this.currentPage = response.paginationInfo?.currentPage!;
          this.paginator.length = this.totalItems;
          console.log(this.pageSize);
          console.log(this.totalItems);
          console.log(this.currentPage);
        }
      },
      (error) => {
        console.error('Error fetching images:', error);
      }
    );
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    console.log('Page size:', this.pageSize);
    console.log('Current page:', this.currentPage);
    const sortBy = 'id'; // You can adjust this as needed

    this.loadImagesData(this.pageSize, this.currentPage, sortBy, this.title, this.latitude, this.longitude);
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

}
