import {Pipe, PipeTransform} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {lastValueFrom} from "rxjs";

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  constructor(
    private http: HttpClient,
  ) {
  }

  async transform(imageId: string): Promise<string> {
    const httpOptions = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("accessToken")}` || '',
    });
    const imageBlob = await lastValueFrom(
      this.http.get(`${environment.rootUrl}/image/v1/admin/view?id=${imageId}`, {
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
