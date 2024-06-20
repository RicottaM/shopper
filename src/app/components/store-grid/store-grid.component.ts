import { Component } from "@angular/core";
import { PositionService } from "../../services/position.service";
import { SectionsService } from "~/app/services/sections.service";
import { PathFindingService } from "~/app/services/path-finding.service";
import { BluetoothService } from "~/app/services/bluetooth.service";
import { Section } from "~/app/models/section.model";
import { roomPositions, sectorMap } from "../../utils/constants";

@Component({
  selector: "app-store-grid",
  templateUrl: "./store-grid.component.html",
  styleUrls: [],
})
export class StoreGridComponent {
  rows: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  columns: number[] = [0, 1, 2, 3, 4, 5, 6];
  sections: Section[] = [];
  currentLocation: number | null = null;
  shortestPath: number[] = [];
  pathSectors: Array<number[]> = [];

  constructor(
    private sectionsService: SectionsService,
    private positionService: PositionService,
    private pathFindingService: PathFindingService,
    private bluetoothService: BluetoothService
  ) {
    sectionsService
      .getSectionsByCart(1)
      .then((sections: Section[]) => {
        this.bluetoothService.scanDevices();
        this.sections = sections;
        //this.currentLocation = 1; // temporary

        this.positionService.currentLocation$.subscribe((location) => {
          this.currentLocation = location;
        });
      })
      .then(() => {
        this.shortestPath = this.pathFindingService.getPath(
          this.sections,
          this.currentLocation
        );
      })
      .then(() => {
        this.setShortestPathSectors();
      });
  }

  ngOnInit() {}

  setShortestPathSectors(): void {
    this.shortestPath.forEach((sector: number) => {
      sectorMap[sector].forEach((sectorElement) => {
        this.pathSectors.push(sectorElement);
      });
    });
  }

  isRoom(row: number, col: number): boolean {
    for (const room of roomPositions) {
      if (room[0] === row && room[1] === col) {
        return true;
      }
    }

    return false;
  }

  isPathSector(row: number, col: number): boolean {
    for (const sector of this.pathSectors) {
      if (sector[0] === row && sector[1] === col) {
        return true;
      }
    }

    return false;
  }

  isUser(row: number, col: number): boolean {
    const userSector = sectorMap[this.currentLocation];

    if (userSector) {
      for (const sector of userSector) {
        if (sector[0] === row && sector[1] === col) {
          return true;
        }
      }
    }

    return false;
  }

  setColor(row: number, col: number): string {
    if (this.isUser(row, col)) {
      return "#2e8913";
    } else if (this.isPathSector(row, col)) {
      return "#a0cbb3";
    } else if (this.isRoom(row, col)) {
      return "#013b3d";
    } else {
      return "#E8FEFD";
    }
  }
}
