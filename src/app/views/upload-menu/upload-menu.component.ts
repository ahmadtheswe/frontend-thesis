import {Component, OnInit} from '@angular/core';
import {ImageService} from "../../service/image-service/image.service";

@Component({
  selector: 'app-upload-menu',
  templateUrl: './upload-menu.component.html',
  styleUrls: ['./upload-menu.component.scss']
})
export class UploadMenuComponent implements OnInit {

  public imageFileToUploadFile: File | null = null;
  public thumbnailFileToUploadFile: File | null = null;
  public title: string = "";
  public productLevel: string = "FREE";
  public isPublic: boolean = true;
  public latitude?: number;
  public longitude?: number;


  alreadyUpload: boolean = false;
  isUploadSuccess: boolean = false;
  uploadMessage: string = "";
  percentage = 0;

  position = 'top-end';

  constructor(private imageService: ImageService) {
  }

  ngOnInit(): void {
  }

  onImageFileSelected(event: any): void {
    this.imageFileToUploadFile = event.target.files[0];
  }

  onThumbnailFileSelected(event: any): void {
    this.thumbnailFileToUploadFile = event.target.files[0];
  }

  handleLatLongClicked(event: { lat?: number, lng?: number }) {
    this.latitude = event.lat;
    this.longitude = event.lng;
  }

  onUpload() {
    this.imageService.uploadImageFile(
      this.imageFileToUploadFile!,
      this.thumbnailFileToUploadFile!,
      this.title,
      this.isPublic,
      this.latitude!,
      this.longitude!,
      this.productLevel)
      .subscribe({
        next: value => {
          this.isUploadSuccess = true;
          this.uploadMessage = "Upload success!";
          this.toggleToast();
        },
        error: err => {
          this.isUploadSuccess = false;
          this.uploadMessage = "Upload success!";
          this.toggleToast();
        }
      })
  }

  toggleToast() {
    this.alreadyUpload = !this.alreadyUpload;
  }

  onVisibleChange($event: boolean) {
    this.alreadyUpload = $event;
    this.percentage = !this.alreadyUpload ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 25;
  }

}
