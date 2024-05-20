import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "../../models/product.model";
import { ProductService } from "../../services/product.service";
import { Page } from "@nativescript/core";

@Component({
  selector: "Products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent {
  products: Product[] = [];
  categoryId: number = undefined;

  constructor(
    private page: Page,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.page.actionBarHidden = true;
  }

  ngOnInit() {
    this.route.params.subscribe((params: { [x: string]: string | number }) => {
      this.categoryId = +params["id"];
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.productService
      .getProductsByCategory(this.categoryId)
      .then((products: Product[]) => {
        this.products = products;
      })
      .catch((error: Error) => {
        console.error("Error loading products: ", error);
      });
  }

  goHome(): void {
    this.router.navigate(["/"]);
  }

  goToCategories(): void {
    this.router.navigate(["/categories"]);
  }
}
