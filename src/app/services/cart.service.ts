import { Injectable } from "@angular/core";
import { Cart } from "../models/cart.model";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cartsUrl: string = "http://localhost:3000/products";

  constructor() {}

  async getCarts(): Promise<Cart[]> {
    return fetch(this.cartsUrl)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .catch((error: Error) => {
        console.error("An error occurred:", error);
      });
  }
}
