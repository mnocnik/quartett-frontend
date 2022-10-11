import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";

import {ManageVehicleTypeService, vehicleAll, vehicleForUUID, VehicleResponse} from "./manage-vehicle-type.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-manage-vehicle-type',
  templateUrl: './manage-vehicle-type.component.html',
  styleUrls: ['./manage-vehicle-type.component.scss']
})
export class ManageVehicleTypeComponent implements OnInit {
  vehicleResponse: VehicleResponse | undefined;
  allVehicles: VehicleResponse[] | undefined;

  constructor(private manageVehicleTypeService: ManageVehicleTypeService) {
  }

  postVehicleRequest() {
    let valueMap = new Map<string, string>();
    valueMap.set("{uuid}", "39abf90e-1860-49fc-bf12-50ce947f5249")

    let observable: Observable<any> = this.manageVehicleTypeService.postForVehicle(
      this.manageVehicleTypeService.buildQuery(vehicleForUUID, valueMap)
    );

    observable.subscribe(
      (response) => {
        this.vehicleResponse = response.data.vehicle as VehicleResponse;
        console.log("Success", this.vehicleResponse);
      },
      error => {
        console.log("Error", error);
      },
      () => {
        console.log("Completed.");
      }
    );
  }

  fetchVehicleTypeShip() {
    let valueMap = new Map<string, string>();
    valueMap.set("{typeUUID}", environment.shipTypeUUID)

    let observable: Observable<any> = this.manageVehicleTypeService.postForVehicleAll(
      this.manageVehicleTypeService.buildQuery(vehicleAll, valueMap)
    );

    observable.subscribe(
      (response) => {
        this.allVehicles = response.data.vehiclesByType as VehicleResponse[];
        console.log("Success", this.vehicleResponse);
      },
      error => {
        console.log("Error", error);
      },
      () => {
        console.log("Completed.");
      }
    );
  }

  ngOnInit(): void {
  }
}
