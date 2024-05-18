import { Injectable } from "@angular/core";
import { Category } from "../models/category.model";

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  private apiUrl = "http://localhost:3000/categories";
  constructor() {}

  async getCategories(): Promise<Category[]> {
    const categories = await fetch(this.apiUrl);

    return (await categories.json()) ?? [];
  }
}
