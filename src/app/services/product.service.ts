import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private productsUrl: string = "http://52.71.93.62/products";

  constructor() {}

  async getProducts(): Promise<Product[]> {
    return fetch(this.productsUrl)
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

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return fetch(`${this.productsUrl}/category/${categoryId}`)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }

  async getProductUnit(productId: number): Promise<string> {
    return fetch(`${this.productsUrl}/${productId}/unit`)
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
