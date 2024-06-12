import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "@nativescript/core";
import { CartItem } from "~/app/models/cart-item";
import { Product } from "~/app/models/product.model";
import { CartItemsService } from "~/app/services/cart-items.service";
import { ProductService } from "~/app/services/product.service";

@Component({
  selector: "ns-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent {
  cartProducts: Product[] = [];
  cartItems: CartItem[] = [];
  userId: number = 1; // domyślnie user o id 1
  cartId: number = 1; // domyślnie koszyk o id 1

  constructor(
    private page: Page,
    private router: Router,
    private productService: ProductService,
    private cartItemsService: CartItemsService
  ) {
    this.page.actionBarHidden = true;
  }

  ngOnInit(): void {
    this.loadCartProducts();
  }

  goToCategories(): void {
    this.router.navigate(["/categories"]);
  }

  goHome(): void {
    this.router.navigate(["/"]);
  }

  loadCartProducts(): void {
    this.cartItemsService
      .getCartItemsByCart(this.cartId)
      .then((cartItems: CartItem[]) => {
        this.cartItems = cartItems;

        this.productService
          .getProducts()
          .then((products: Product[]) => {
            this.cartProducts = products.filter((product: Product) =>
              cartItems.some(
                (cartItem: CartItem) =>
                  cartItem.product_id === product.product_id
              )
            );
          })
          .catch((error: Error) => {
            console.error("Error when loading products: ", error);
          });
      })
      .catch((error: Error) => {
        console.error("Error when loading cart items: ", error);
      });
  }

  goToMap(): void {
    this.router.navigate(["/map"]);
  }

  deleteFromCart(productId: number): void {
    const cartItem: CartItem = this.cartItems.find(
      (cartItem: CartItem) => cartItem.product_id === productId
    );

    if (cartItem) {
      this.cartItemsService
        .deleteCartItem(cartItem.cart_item_id)
        .then(() => {
          this.updateStates(productId);
        })
        .catch((error: Error) => {
          console.error("Error when deleting cart item: ", error);
        });
    }
  }

  updateStates(productId: number): void {
    this.cartItems = this.cartItems.filter(
      (cartItem: CartItem) => cartItem.product_id !== productId
    );

    this.cartProducts = this.cartProducts.filter(
      (product: Product) => product.product_id !== productId
    );
  }
}
