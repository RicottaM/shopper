import { Injectable } from "@angular/core";
import { Frame } from "@nativescript/core";

@Injectable({
  providedIn: "root",
})
export class NavigationService {
  constructor() {}

  navigateTo(route: string): void {
    Frame.topmost().navigate({
      moduleName: route,
      clearHistory: false,
    });
  }

  goBack(): void {
    Frame.topmost().goBack();
  }
}
