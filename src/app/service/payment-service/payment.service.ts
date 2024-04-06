import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {
  ActivePackageResponse,
  OnProgressPaymentResponse, PackageCountResponse,
  PaymentCheckResponse,
  PaymentRequest,
  PaymentResponse
} from "./payment-dto";
import {Observable} from "rxjs";
import {DataResponse} from "../../model/dto/response/DataResponse";
import {ActiveUsersCount} from "../../model/dto/entity/ActiveUsersCount";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) {
  }

  generateCharge(paymentRequest: PaymentRequest): Observable<PaymentResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}` || '',
      })
    };

    return this.http.post<PaymentResponse>(`${environment.paymentUrl}/charge`, paymentRequest, httpOptions);
  }

  checkPaymentStatus(orderId: string): Observable<PaymentCheckResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}` || '',
      })
    };

    return this.http.get<PaymentCheckResponse>(`${environment.paymentUrl}/check?orderId=${orderId}`, httpOptions);
  }

  checkOnProgressPayment(): Observable<OnProgressPaymentResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}` || '',
      })
    };

    return this.http.get<OnProgressPaymentResponse>(`${environment.paymentUrl}/on-progress`, httpOptions);
  }

  checkActivePackage(): Observable<ActivePackageResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}` || '',
      })
    };

    return this.http.get<ActivePackageResponse>(environment.paymentUrl, httpOptions);
  }

  cancelOnProgressPayment(): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}` || '',
      })
    };

    return this.http.get(`${environment.paymentUrl}/cancel`, httpOptions);
  }

  getActivePaidSubscriptionCount(): Observable<PackageCountResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}` || '',
      })
    };

    return this.http.get<PackageCountResponse[]>(`${environment.paymentUrl}/package-count`, httpOptions);
  }
}
