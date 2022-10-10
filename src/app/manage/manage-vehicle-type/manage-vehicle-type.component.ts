import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";

import {ManageVehicleTypeService, vehicleAll, vehicleForUUID, VehicleResponse} from "./manage-vehicle-type.service";

@Component({
  selector: 'app-manage-vehicle-type',
  templateUrl: './manage-vehicle-type.component.html',
  styleUrls: ['./manage-vehicle-type.component.scss']
})
export class ManageVehicleTypeComponent implements OnInit {
  title: string = "WORKS: ManageVehicleType";
  vehicleResponse: VehicleResponse | undefined;
  allVehicles: VehicleResponse[] | undefined;

  constructor(private manageVehicleTypeService: ManageVehicleTypeService) {
  }

  postVehicleRequest() {
    let valueMap = new Map<string, string>();
    valueMap.set("{uuid}", "b194aaee-089d-4bf0-9feb-311d2c0f62f8")

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

  postVehicleAllRequest() {
    let valueMap = new Map<string, string>();
    valueMap.set("{typeUUID}", "87a6da7a-eec6-4bdb-8c08-9453efff69c8")

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

  experimental() {
    this.manageVehicleTypeService.experimental();
  }
}
