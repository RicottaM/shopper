import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "../../models/product.model";
import { ProductService } from "../../services/product.service";
import { CartItemsService } from "../../services/cart-items.service";
import { Page, TextField } from "@nativescript/core";
import { CartItem } from "~/app/models/cart-item";

@Component({
  selector: "Products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent {
  products: Product[] = [];
  categoryId: number = undefined;
  cartId: number = 1; // domyslnie koszyk 1 usera 1

  constructor(
    private page: Page,
    private productService: ProductService,
    private cartItemsService: CartItemsService,
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

        this.products.forEach((product: Product) => {
          this.productService
            .getProductUnit(product.product_id)
            .then((unit_symbol: string) => {
              product.unit_symbol = unit_symbol;
            })
            .catch((error: Error) => {
              console.error("Error when assigning units to products: ", error);
            });
        });
      })
      .catch((error: Error) => {
        console.error("Error when loading products: ", error);
      });
  }

  goHome(): void {
    this.router.navigate(["/"]);
  }

  goToCart(): void {
    this.router.navigate(["/cart"]);
  }

  goToCategories(): void {
    this.router.navigate(["/categories"]);
  }

  addToCart(product: Product, index: number): void {
    // const quantityField = <TextField>(
    //   this.page.getViewById(`product-quantity-${index}`)
    // );
    //const enteredQuantity = parseInt(quantityField.text, 10);

    // if (isNaN(enteredQuantity) || enteredQuantity <= 0) {
    //   alert("Please enter a valid quantity.");

    //   return;
    // }

    // if (enteredQuantity > product.amount) {
    //   alert(`There are only ${Math.floor(product.amount)} products left.`);

    //   return;
    // }

    const newCartItem: CartItem = {
      cart_id: this.cartId,
      product_id: product.product_id,
      quantity: 1,
    };

    this.cartItemsService.addCartItem(newCartItem);
  }
}
