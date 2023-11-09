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
  displayStartMonths = 1;
  navigationStart = 'select';
  showStartWeekNumbers = false;
  startOutsideDays = 'visible';

  displayEndMonths = 1;
  navigationEnd = 'select';
  showEndWeekNumbers = false;
  endOutsideDays = 'visible';

  displayedColumns: string[] = ['preview', 'title', 'price-idr', 'coordinate', 'view'];
  totalItems: number = 0;
  pageSize: number = 5;
  currentPage: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  dataSource: MatTableDataSource<Image> = new MatTableDataSource<Image>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private testingService: TestingService,
    private imageService: ImageService
  ) {
    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource<Image>();
  }

  ngOnInit(): void {
    this.loadImagesData(this.pageSize, this.currentPage, 'id');
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // this.loadImagesData(10, this.paginator.pageIndex, 'id');
  }

  testingApi() {
    this.testingService.testingApi().subscribe((value) => {
      console.log(value);
    })
  }

  loadImagesData(size: number, page: number, sortBy: string) {
    this.imageService.getImagesPagination(size, page, sortBy).subscribe(
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

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    console.log('Page size:', this.pageSize);
    console.log('Current page:', this.currentPage);
    const sortBy = 'id'; // You can adjust this as needed

    this.loadImagesData(this.pageSize, this.currentPage, sortBy);
  }
}
