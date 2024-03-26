import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";

import { DataService, DataItem } from "../../shared/data.service";

import { Bluetooth, Peripheral } from "@nativescript-community/ble";
import { Utils, EventData } from "@nativescript/core";
import { request } from "@nativescript-community/perms";

@Component({
  selector: "ItemDetail",
  templateUrl: "./item-detail.component.html",
})
export class ItemDetailComponent implements OnInit {
  item: DataItem;
  bluetooth: Bluetooth;
  discoveredPeripherals: Array<{ name: string; address: string }> = [];
  throttleScanResults = Utils.throttle(this._throttleScanResults, 600);

  constructor(
    private _data: DataService,
    private _route: ActivatedRoute,
    private _routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    const id = +this._route.snapshot.params.id;
    this.item = this._data.getItem(id);
    this.bluetooth = new Bluetooth();

    this.bluetooth.on(Bluetooth.device_discovered_event, (args: any) => {
      const peripheral: Peripheral = args.peripheral;
      if (peripheral?.name) {
        console.log("test debug");
        if (
          !this.discoveredPeripherals.find((p) => p.address === peripheral.UUID)
        ) {
          this.discoveredPeripherals.push({
            name: peripheral.name.trim(),
            address: peripheral.UUID?.trim(),
          });
        }
        this.throttleScanResults();
      }
    });
  }

  startBluetoothScan(): void {
    console.log("startBluetoothScan");
    this.bluetooth
      .startScanning({ seconds: 4 })
      .then(() => {
        console.log("Scanning started successfully");
      })
      .catch((err) => {
        console.log("Error starting scanning: " + err);
      });
  }

  _throttleScanResults() {
    console.log("scanResults", this.discoveredPeripherals);
  }

  stopBluetoothScan(): void {
    this.bluetooth.stopScanning();
    this.bluetooth.off(Bluetooth.device_discovered_event);
  }

  onBackTap(): void {
    this.bluetooth.hasLocationPermission().then((granted) => {
      if (!granted) {
        this.bluetooth
          .requestLocationPermission()
          .then(() => {
            this.startBluetoothScan();
          })
          .catch((err) => {
            console.log("Error requesting Bluetooth scan permission: " + err);
          });
      } else {
        this.startBluetoothScan();
      }
    });
  }
}
