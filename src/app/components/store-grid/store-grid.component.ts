import { Component } from "@angular/core";
import { PositionService } from "../../services/position.service";

@Component({
  selector: "app-store-grid",
  templateUrl: "./store-grid.component.html",
  styleUrls: [],
})
export class StoreGridComponent {
  rows: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  columns: number[] = [0, 1, 2, 3, 4, 5, 6];
  roomPositions: Array<Array<number>> = [
    [1, 1],
    [1, 2],
    [1, 4],
    [1, 5], // room 1
    [2, 1],
    [2, 2],
    [2, 4],
    [2, 5], // room 2
    [4, 1],
    [4, 2],
    [4, 4],
    [4, 5], // room 3
    [5, 1],
    [5, 2],
    [5, 4],
    [5, 5], // room 4
    [7, 1],
    [7, 2],
    [7, 4],
    [7, 5], // room 5
    [8, 1],
    [8, 2],
    [8, 4],
    [8, 5], // room 6
    [10, 1],
    [10, 2],
    [10, 4],
    [10, 5], // room 7
    [11, 1],
    [11, 2],
    [11, 4],
    [11, 5], // room 8
  ];

  currentLocation: number | null = null;

  constructor(private positionService: PositionService) {}

  ngOnInit() {
    this.positionService.currentLocation$.subscribe((location) => {
      this.currentLocation = location;
    });
  }

  isRoom(row: number, col: number): boolean {
    for (const room of this.roomPositions) {
      if (room[0] === row && room[1] === col) {
        return true;
      }
    }

    return false;
  }
}
