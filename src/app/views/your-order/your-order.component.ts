import {Component, OnInit} from '@angular/core';
import {ImageService} from "../../service/image-service/image.service";
import {Subscription} from "rxjs";
import {PreOrderResponse} from "../../model/dto/response/PreOrderResponse";
import {Router} from "@angular/router";

@Component({
  selector: 'app-your-order',
  templateUrl: './your-order.component.html',
  styleUrls: ['./your-order.component.scss']
})
export class YourOrderComponent implements OnInit {
  preOrderList: PreOrderResponse[] | undefined = [];
  private subscription: Subscription = new Subscription();
  constructor(private imageService: ImageService, private router: Router) {
  }

  ngOnInit(): void {
    this.subscription.add(this.imageService.getPreOrder().subscribe({
      next: (data) => {
        this.preOrderList = data.data;
      }
    }))
  }

  onCreateNewOrderClick() {
    this.router.navigate(["/create-order"]);
  }
}
