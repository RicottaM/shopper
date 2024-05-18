import { Component, inject } from "@angular/core";
import { Page } from "@nativescript/core";
import { Category } from "../../models/category.model";
import { CategoriesService } from "../../services/categories.service";

@Component({
  selector: "Categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"],
})
export class CategoriesComponent {
  categories: Category[] = [];
  categoriesService: CategoriesService = inject(CategoriesService);

  constructor(private page: Page) {
    this.page.actionBarHidden = true;

    this.categoriesService.getCategories().then((categories: Category[]) => {
      this.categories = categories;
    });
  }
}
