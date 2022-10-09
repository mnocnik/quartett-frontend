import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {
  ManageVehicleTypeComponent
} from "./manage/manage-vehicle-type/manage-vehicle-type.component";

const routes: Routes = [
  {path: 'manage-vehicle-type', component: ManageVehicleTypeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
