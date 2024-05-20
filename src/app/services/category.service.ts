import { Injectable } from "@angular/core";
import { Category } from "../models/category.model";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private categoriesUrl: string = "http://localhost:3000/categories";

  constructor() {}

  async getCategories(): Promise<Category[]> {
    return fetch(this.categoriesUrl)
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
