import {Component, OnDestroy, OnInit} from '@angular/core';
import {CopernicusPriceService} from "../../service/copernicus-price-service/copernicus-price.service";
import {
  CopernicusPriceDto,
  CopernicusPriceUpdateDto
} from "../../service/copernicus-price-service/copernicus-price-dto";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-admin-price',
  templateUrl: './admin-price.component.html',
  styleUrls: ['./admin-price.component.scss']
})
export class AdminPriceComponent implements OnInit, OnDestroy {

  copernicusPrices: CopernicusPriceDto[] = [];
  subscription: Subscription = new Subscription();

  constructor(private copernicusPriceService: CopernicusPriceService) {
  }

  ngOnInit(): void {
    this.subscription.add(this.copernicusPriceService.getPriceList().subscribe({
      next: data => {
        this.copernicusPrices = data;
        this.copernicusPrices.forEach(price => price.isUpdating = false);
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEditClick(id: string | undefined) {
    if (id) {
      this.copernicusPrices.forEach(price => {
        if (price.id === id) {
          price.isUpdating = true;
        }
      })
    }
  }

  cancelUpdate(id: string | undefined) {
    if (id) {
      this.copernicusPrices.forEach(price => {
        if (price.id === id) {
          price.isUpdating = false;
        }
      })
    }
  }

  saveEdit(price: CopernicusPriceDto) {
    const updateDto: CopernicusPriceUpdateDto = {
      id: price.id,
      price: price.price,
    }
    this.subscription.add(this.copernicusPriceService.updatePrice(updateDto).subscribe({
      next: data => {
        this.subscription.add(this.copernicusPriceService.getPriceList().subscribe({
          next: data => {
            this.copernicusPrices = data;
            this.copernicusPrices.forEach(price => price.isUpdating = false);
          }
        }));
      }
    }));
  }
}
