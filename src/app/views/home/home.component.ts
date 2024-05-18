import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NavigationService } from "../../services/navigation.service";

@Component({
  selector: "Home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  text: String = "";

  constructor(private navigationService: NavigationService) {}

  goBack(): void {
    this.navigationService.goBack();
  }

  goToCategories(): void {
    this.navigationService.navigateTo("categories");
  }
}
