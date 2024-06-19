import { Injectable } from "@angular/core";
import { Unit } from "../models/unit.model";

@Injectable({
  providedIn: "root",
})
export class UnitService {
  private unitsUrl: string = "http://52.71.93.62/units";

  constructor() {}

  async getUnits(): Promise<Unit[]> {
    return fetch(this.unitsUrl)
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

  async getUnitById(id: number): Promise<Unit> {
    return fetch(`${this.unitsUrl}/${id}`)
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
