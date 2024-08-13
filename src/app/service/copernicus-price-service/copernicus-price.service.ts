import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ActivePackageResponse} from "../payment-service/payment-dto";
import {environment} from "../../../environments/environment";
import {CopernicusPriceDto, CopernicusPriceUpdateDto} from "./copernicus-price-dto";

@Injectable({
  providedIn: 'root'
})
export class CopernicusPriceService {

  constructor(private http: HttpClient) { }

  updatePrice(updateRequest: CopernicusPriceUpdateDto) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}` || '',
      })
    };

    return this.http.put(`${environment.paymentUrl}/copernicus-price/update`, updateRequest, httpOptions);
  }

  getPriceList(): Observable<CopernicusPriceDto[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}` || '',
      })
    };

    return this.http.get<CopernicusPriceDto[]>(`${environment.paymentUrl}/copernicus-price/all`, httpOptions);
  }

  getPriceById(id: string): Observable<CopernicusPriceDto> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}` || '',
      })
    };

    return this.http.get<CopernicusPriceDto>(`${environment.paymentUrl}/copernicus-price?id=${id}`, httpOptions);
  }

}
