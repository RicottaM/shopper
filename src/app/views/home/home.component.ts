import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "@nativescript/core";

@Component({
  selector: "Home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  constructor(private router: Router, private page: Page) {
    this.page.actionBarHidden = true;
  }

  goToCategories(): void {
    this.router.navigate(["/categories"]);
  }
}
