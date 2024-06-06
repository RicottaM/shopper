import { Component } from "@angular/core";
import { Page } from "@nativescript/core";
import { Category } from "../../models/category.model";
import { CategoryService } from "../../services/category.service";
import { Router } from "@angular/router";

@Component({
  selector: "Categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"],
})
export class CategoriesComponent {
  categories: Category[] = [];

  constructor(
    private page: Page,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.page.actionBarHidden = true;
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService
      .getCategories()
      .then((categories: Category[]) => {
        this.categories = categories;
      })
      .catch((error: Error) => {
        console.error("Error loading categories: ", error);
      });
  }

  goHome(): void {
    this.router.navigate(["/"]);
  }

  goToProducts(categoryId: number): void {
    this.router.navigate(["/products", { id: categoryId }]);
  }

  goToCart(): void {
    this.router.navigate(["/cart"]);
  }
}
