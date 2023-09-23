import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import * as http from "http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TestingService {

  constructor(private http: HttpClient) { }

  testingApi(): Observable<any> {
    return this.http.get<any>(`${environment.rootUrl}/testing`);
  }
}
