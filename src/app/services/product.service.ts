import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private productsUrl: string = "http://localhost:3000/products";

  constructor() {}

  async getProducts(): Promise<Product[]> {
    return fetch(this.productsUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return fetch(`${this.productsUrl}/category/${categoryId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }
}
