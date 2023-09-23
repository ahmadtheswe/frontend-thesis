import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
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
    return this.http
      .get<PaginationResponse<Image>>(`${environment.rootUrl}/image/v1?size=${size}&page=${page}&sortBy=${sortBy}`);
  }

  downloadImageById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.rootUrl}/image/v1/view?id=${id}`);
  }

  uploadImageFile(fileToUpload: File, title: string, isPublic: boolean): Observable<DataResponse<Image>> {
    const formData: FormData = new FormData();
    formData.append('image', fileToUpload);
    formData.append('title', title);
    formData.append('isPublic', isPublic.toString());
    return this.http.post<DataResponse<Image>>(`${environment.rootUrl}/image/v1`, formData);
  }
}
