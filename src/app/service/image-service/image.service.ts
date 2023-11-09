import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {DataResponse} from "../../model/dto/response/DataResponse";
import {Image} from "../../model/dto/entity/Image";
import {PaginationResponse} from "../../model/dto/response/PaginationResponse";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {
  }

  getImageById(id: string): Observable<DataResponse<Image>> {
    return this.http.get<DataResponse<Image>>(`${environment.rootUrl}/image/v1?id=${id}`);
  }

  getImagesPagination(size: number, page: number, sortBy: string): Observable<PaginationResponse<Image>> {
    console.log(localStorage.getItem("accessToken"));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}` || '',
      })
    };
    return this.http
      .get<PaginationResponse<Image>>(`${environment.rootUrl}/image/v1/admin?size=${size}&page=${page}&sortBy=${sortBy}`, httpOptions);
  }

  downloadImageById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.rootUrl}/image/v1/view?id=${id}`);
  }

  uploadImageFile(
    fileToUpload: File,
    title: string,
    isPublic: boolean,
    priceIDR: number,
    latitude: number,
    longitude: number): Observable<DataResponse<Image>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}` || '',
      })
    };

    const formData: FormData = new FormData();
    formData.append('image', fileToUpload);
    formData.append('title', title.trim());
    formData.append('isPublic', isPublic.toString());
    formData.append('priceIDR', priceIDR.toString());
    formData.append('latitude', latitude.toString());
    formData.append('longitude', longitude.toString());
    return this.http.post<DataResponse<Image>>(`${environment.rootUrl}/image/v1/admin`, formData, httpOptions);
  }
}
