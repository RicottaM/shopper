import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BluetoothComponent } from "./components/bluetooth/bluetooth.component";
import { HomeComponent } from "./views/home/home.component";
import { CategoriesComponent } from "./views/categories/categories.component";
import { ProductsComponent } from "./views/products/products.component";

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, AppRoutingModule],
  declarations: [
    AppComponent,
    BluetoothComponent,
    HomeComponent,
    CategoriesComponent,
    ProductsComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
