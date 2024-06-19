import { Injectable } from "@angular/core";
import { Category } from "../models/category.model";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private categoriesUrl: string = "http://52.71.93.62/categories";

  constructor() {}

  async getCategories(): Promise<Category[]> {
    return fetch(this.categoriesUrl)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response}`);
        }

        return response.json();
      })
      .catch((error: Error) => {
        console.error("An error occurred:", error);
      });
  }
}
