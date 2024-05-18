import { Component } from "@angular/core";
import { Page } from "@nativescript/core";

@Component({
  selector: "Categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"],
})
export class CategoriesComponent {
  constructor(private page: Page) {
    this.page.actionBarHidden = true;
  }
}
