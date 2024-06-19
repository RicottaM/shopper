import { Injectable } from "@angular/core";
import { Cart } from "../models/cart.model";
import { Section } from "../models/section.model";

@Injectable({
  providedIn: "root",
})
export class SectionsService {
  private cartsUrl: string = "http://52.71.93.62/carts";

  constructor() {}

  async getSectionsByCart(cartId: number): Promise<Section[]> {
    return fetch(`${this.cartsUrl}/${cartId}/sections`)
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
