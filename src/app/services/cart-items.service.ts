import { Injectable } from "@angular/core";
import { CartItem } from "../models/cart-item";
import { Cart } from "../models/cart.model";

@Injectable({
  providedIn: "root",
})
export class CartItemsService {
  private cartItemsUrl: string = "http://localhost:3000/cart-items";

  constructor() {}

  async getCartItems(): Promise<CartItem[]> {
    return fetch(this.cartItemsUrl)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error("Response was not ok while getting cart items.");
        }

        return response.json();
      })
      .catch((error: Error) => {
        console.error(error);
      });
  }

  async addCartItem(cartItem: CartItem): Promise<CartItem> {
    alert(`${cartItem.cart_id}/${cartItem.product_id}/${cartItem.quantity}`);
    return fetch(this.cartItemsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItem),
    })
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error("Response was not ok while adding cart item.");
        }

        return response.json();
      })
      .catch((error: Error) => {
        console.error(error);
      });
  }

  async deleteCartItem(cartItemId: number): Promise<Object> {
    return fetch(`${this.cartItemsUrl}/${cartItemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error("Response was not ok while deleting cart item.");
        }

        return response.json();
      })
      .catch((error: Error) => {
        console.error(error);
      });
  }

  async getCartItemsByCart(cartId: number): Promise<CartItem[]> {
    const cartItems = await this.getCartItems();

    return cartItems.filter(
      (cartItem: CartItem) => cartItem.cart_id === cartId
    );
  }
}
