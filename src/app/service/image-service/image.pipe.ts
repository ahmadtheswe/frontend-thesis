import {Pipe, PipeTransform} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {lastValueFrom} from "rxjs";
import {SecurityService} from "../security-service/security.service";

@Pipe({
  name: 'imageThumbnail'
})
export class ImagePipe implements PipeTransform {

  constructor(
    private http: HttpClient,
    private securityService: SecurityService
  ) {
  }

  async transform(imageId: string): Promise<string> {
    const httpOptions = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("accessToken")}` || '',
    });
    const url = this.securityService.getRole() === 'admin'?
      `${environment.rootUrl}/image/v1/admin/view/thumbnail?id=${imageId}`:
      `${environment.rootUrl}/image/v1/regular/view/thumbnail?id=${imageId}`;
    const imageBlob = await lastValueFrom(
      this.http.get(url, {
        headers: httpOptions,
        responseType: 'blob',
      })
    );
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(imageBlob!);
    })
  }

}
