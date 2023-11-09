import {Component, OnInit} from '@angular/core';
import {ImageService} from "../../service/image-service/image.service";

@Component({
  selector: 'app-upload-menu',
  templateUrl: './upload-menu.component.html',
  styleUrls: ['./upload-menu.component.scss']
})
export class UploadMenuComponent implements OnInit {

  public selectedFile: File | null = null;
  public title: string = "";
  public isPublic: boolean = false;
  public priceIDR: number = 0;
  public latitude: number = 0;
  public longitude: number = 0;

  constructor(private imageService: ImageService) {
  }

  ngOnInit(): void {
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    this.imageService.uploadImageFile(
      this.selectedFile!,
      this.title,
      this.isPublic,
      this.priceIDR,
      this.latitude,
      this.longitude)
      .subscribe(response => {
        console.log(response);
      })
  }

}
