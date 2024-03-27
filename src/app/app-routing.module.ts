import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { BluetoothComponent } from "./bluetooth/bluetooth.component";

const routes: Routes = [
  { path: "", redirectTo: "/bluetooth", pathMatch: "full" },
  { path: "bluetooth", component: BluetoothComponent },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
