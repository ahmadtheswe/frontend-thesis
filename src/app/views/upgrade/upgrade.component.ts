import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SecurityService} from "../../service/security-service/security.service";

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss']
})
export class UpgradeComponent implements OnInit {

  packageLevel: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private securityService: SecurityService) {
    this.activatedRoute.params.subscribe(params => {
      this.packageLevel = params['package'];
      console.log(this.packageLevel);
    });
  }

  ngOnInit(): void {
    if (this.securityService.getSubscriptionLevel() === "PREMIUM") {
      this.router.navigate(['images']);
    }

    if (this.securityService.getSubscriptionLevel() === "PRO" && this.packageLevel === "PRO") {
      this.router.navigate(['images']);
    }

    if (this.packageLevel !== "PREMIUM" && this.packageLevel !== "PRO") {
      this.router.navigate(['images']);
    }
  }

  upgradePro() {

  }

  upgradePremium() {

  }
}
