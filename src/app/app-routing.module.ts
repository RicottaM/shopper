import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { BluetoothComponent } from "./bluetooth/bluetooth.component";
import { HomeComponent } from "./views/home/home.component";
import { CategoriesComponent } from "./views/categories/categories.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "bluetooth", component: BluetoothComponent },
  { path: "categories", component: CategoriesComponent },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
