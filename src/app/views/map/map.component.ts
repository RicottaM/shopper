import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "@nativescript/core";
import { CartItemsService } from "~/app/services/cart-items.service";
import { ProductService } from "~/app/services/product.service";

@Component({
  selector: "ns-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent {
  constructor(
    private page: Page,
    private router: Router,
    private productService: ProductService,
    private cartItemsService: CartItemsService
  ) {
    this.page.actionBarHidden = true;
  }

  goToCart(): void {
    this.router.navigate(["/cart"]);
  }

  goHome(): void {
    this.router.navigate(["/"]);
  }
}
