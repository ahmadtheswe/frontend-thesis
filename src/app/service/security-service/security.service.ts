import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {OAuthService, TokenResponse} from "angular-oauth2-oidc";
import {Observable, tap} from "rxjs";
import {DataResponse} from "../../model/dto/response/DataResponse";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private prefixUrl = environment.securityUrl;
  private _isAuthenticated = false;

  constructor(
    private http: HttpClient,
    private oauthService: OAuthService
  ) {
    this._isAuthenticated = !!localStorage.getItem("accessToken");
  }

  get isAuthenticated() {
    return this._isAuthenticated;
  }

  login(username: string, password: string): Observable<DataResponse<TokenResponse>> {
    return this.http.post(this.prefixUrl + '/login', {username: username, password: password})
      .pipe(
        tap(() => {
          this._isAuthenticated = true;
          console.log(this._isAuthenticated);
        })
      );
  }

  logout(): Observable<any> {
    console.log(localStorage.getItem("accessToken"));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}` || '',
      })
    };
    return this.http.get(this.prefixUrl + '/logout', httpOptions)
      .pipe(tap(() => {
        this._isAuthenticated = false;
      }));
  }

}
