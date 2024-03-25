import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {DataResponse} from "../../model/dto/response/DataResponse";
import {Image} from "../../model/dto/entity/Image";
import {PaginationResponse} from "../../model/dto/response/PaginationResponse";
import {SecurityService} from "../security-service/security.service";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient, private securityService: SecurityService) {
  }

  getImageById(id: string): Observable<DataResponse<Image>> {
    return this.http.get<DataResponse<Image>>(`${environment.rootUrl}/image/v1?id=${id}`);
  }

  getImagesPagination(size: number, page: number, sortBy: string, title?: string, latitude?: number, longitude?: number)
    : Observable<PaginationResponse<Image>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}` || '',
      })
    };

    let url = this.securityService.getRole() === "admin" ?
      `${environment.rootUrl}/image/v1/admin?size=${size}&page=${page}&sortBy=${sortBy}` :
      `${environment.rootUrl}/image/v1/regular?size=${size}&page=${page}&sortBy=${sortBy}`;

    if (title) {
      url += `&title=${encodeURIComponent(title)}`;
    }
    if (latitude !== null && latitude !== undefined) {
      url += `&latitude=${latitude}`;
    }
    if (longitude !== null && longitude !== undefined) {
      url += `&longitude=${longitude}`;
    }

    return this.http
      .get<PaginationResponse<Image>>(url, httpOptions);
  }

  downloadImageById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.rootUrl}/image/v1/view?id=${id}`);
  }

  uploadImageFile(
    fileToUpload: File,
    thumbnailFileToUpload: File,
    title: string,
    isPublic: boolean,
    latitude: number,
    longitude: number,
    productLevel: string): Observable<DataResponse<Image>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}` || '',
      })
    };

    const formData: FormData = new FormData();
    formData.append('image', fileToUpload);
    formData.append('thumbnail', thumbnailFileToUpload);
    formData.append('title', title.trim());
    formData.append('isPublic', isPublic.toString());
    formData.append('latitude', latitude.toString());
    formData.append('longitude', longitude.toString());
    formData.append('productLevel', productLevel.trim());
    return this.http.post<DataResponse<Image>>(`${environment.rootUrl}/image/v1/admin`, formData, httpOptions);
  }

  storeImageId(image: Image) {
    localStorage.setItem("imageId", image.id!);
  }

  removeImageId() {
    localStorage.removeItem("imageId");
  }

  getImageId(): string {
    return localStorage.getItem("imageId")!;
  }

  regularDownloadImage(imageId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}` || '',
      })
    };

    return this.http.get(`${environment.rootUrl}/image/v1/regular/view?id=${imageId}`, {
      responseType: 'blob',
      headers: httpOptions.headers
    });
  }
}
