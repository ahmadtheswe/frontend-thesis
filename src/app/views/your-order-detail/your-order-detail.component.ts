import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ImageService} from "../../service/image-service/image.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {PreOrderResponse} from "../../model/dto/response/PreOrderResponse";

@Component({
  selector: 'app-your-order-detail',
  templateUrl: './your-order-detail.component.html',
  styleUrls: ['./your-order-detail.component.scss']
})
export class YourOrderDetailComponent implements OnInit, OnDestroy {

  preOrderId: string = "";
  preOrder: PreOrderResponse | undefined = undefined;

  subscription: Subscription = new Subscription();

  constructor(private imageService: ImageService, private router: Router, private cdr: ChangeDetectorRef) {
  }


  ngOnInit(): void {
    // assign preOrderId from path parameter
    this.preOrderId = this.router.url.split("/")[2];
    this.subscription.add(this.imageService.getPreOrderById(this.preOrderId).subscribe({
      next: data => {
        this.preOrder = data.data;
        this.cdr.detectChanges();
      }
    }));
    console.log(this.preOrderId);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  downloadImage(preOrderId: string) {
    this.subscription.add(this.imageService.preorderDownloadImage(preOrderId).subscribe(blob => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.target = '_blank';
      link.click();
    }));
  }

}
