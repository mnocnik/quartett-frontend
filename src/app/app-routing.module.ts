import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {
  ManageVehiclesComponent
} from "./manage/manage-vehicles/manage-vehicles.component";
import {ManageVehicleTypeComponent} from "./manage/manage-vehicle-type/manage-vehicle-type.component";

const routes: Routes = [
  {path: 'manage-vehicles', component: ManageVehiclesComponent},
  {path: 'manage-vehicle-type', component: ManageVehicleTypeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
