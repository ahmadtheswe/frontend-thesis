import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {SecurityService} from "./security.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private securityService: SecurityService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(`auth_status: ${this.securityService.isAuthenticated}, is_expired: ${this.securityService.isTokenExpired}`);
    if (!this.securityService.isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
