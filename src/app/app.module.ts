import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManageVehicleTypeComponent } from './manage/manage-vehicle-type/manage-vehicle-type.component';

@NgModule({
  declarations: [
    AppComponent,
    ManageVehicleTypeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
