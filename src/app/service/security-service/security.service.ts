import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {OAuthService} from "angular-oauth2-oidc";
import {Observable, tap} from "rxjs";
import {DataResponse} from "../../model/dto/response/DataResponse";
import {RegisterRequest} from "./security-dto";
import {ExtendedTokenResponse} from "./ExtendedTokenResponse";
import {ActiveUsersCount} from "../../model/dto/entity/ActiveUsersCount";
import {Image} from "../../model/dto/entity/Image";

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

  get isAuthenticated(): boolean {
    return this._isAuthenticated && !this.isTokenExpired;
  }

  get isTokenExpired(): boolean {
    const expiry = localStorage.getItem("tokenExpiresAt");
    if (!expiry) {
      return true;
    }
    return parseInt(expiry) < new Date().getTime();
  }

  login(username: string, password: string): Observable<DataResponse<ExtendedTokenResponse>> {
    return this.http.post(this.prefixUrl + '/login', {username: username, password: password})
      .pipe(
        tap(() => {
          this._isAuthenticated = true;
        })
      );
  }

  handleResponse(tokenResponse: ExtendedTokenResponse): void {
    localStorage.setItem("accessToken", tokenResponse?.access_token!);
    localStorage.setItem("refreshToken", tokenResponse?.refresh_token!);
    localStorage.setItem("tokenExpiresAt", (new Date().getTime() + tokenResponse?.expires_in! * 1000).toString());
    localStorage.setItem("role", tokenResponse?.role!);
    localStorage.setItem("subscriptionLevel", tokenResponse?.subscriptionLevel!);
    localStorage.setItem("email", tokenResponse?.email!);
    localStorage.setItem("username", tokenResponse?.username!);
  }

  getRole() {
    return localStorage.getItem("role");
  }

  getUsername() {
    return localStorage.getItem("username");
  }

  getSubscriptionLevel() {
    return localStorage.getItem("subscriptionLevel");
  }

  logout(): Observable<any> {
    this.cleanLocalStorage();
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

  cleanLocalStorage() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenExpiresAt");
    localStorage.removeItem("role");
    localStorage.removeItem("subscriptionLevel");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("activeOrderId");
    localStorage.removeItem("imageId");
  }

  register(registerRequest: RegisterRequest): Observable<HttpResponse<DataResponse<string>>> {
    return this.http.post<DataResponse<string>>(this.prefixUrl + '/registration', registerRequest, { observe: 'response' });
  }


  getActiveUsersCount(): Observable<DataResponse<ActiveUsersCount>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}` || '',
      })
    };

    return this.http.get<DataResponse<ActiveUsersCount>>(`${environment.securityUrl}/admin/active-users`, httpOptions);
  }
}
