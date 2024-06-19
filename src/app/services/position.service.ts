import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PositionService {
  private currentLocationSubject = new BehaviorSubject<number | null>(null);
  currentLocation$ = this.currentLocationSubject.asObservable();

  updateLocation(location: number) {
    this.currentLocationSubject.next(location);
  }
}
