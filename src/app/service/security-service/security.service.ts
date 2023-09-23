import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private prefixUrl = environment.securityUrl;

  constructor(
    private http: HttpClient,
    // private jwtHelper: JwtHelperService
  ) {
  }

  login(username: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password')
      .set('scope', 'openid')
      .set('client_id', 'image-keycloak-springboot')
      .set('client_secret', 'XHabFbfDNgPN8Q65HDE9ns08cK9p8BcC');
    return this.http.post(this.prefixUrl + '/login', body.toString(), {headers: headers});
  }

}
