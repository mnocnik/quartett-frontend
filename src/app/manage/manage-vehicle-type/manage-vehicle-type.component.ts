import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";

import {ManageVehicleTypeService, VehicleTypeResponse, vehicleTypes} from "./manage-vehicle-type.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-manage-vehicle-type',
  templateUrl: './manage-vehicle-type.component.html',
  styleUrls: ['./manage-vehicle-type.component.scss']
})
export class ManageVehicleTypeComponent implements OnInit {
  dataSource: MatTableDataSource<VehicleTypeResponse>;
  vehicleTypes: VehicleTypeResponse[] = [];
  selectedVehicleType: VehicleTypeResponse | undefined;
  create: boolean = false;

  constructor(private manageVehicleTypeService: ManageVehicleTypeService) {
    this.dataSource = new MatTableDataSource(this.vehicleTypes.slice());
  }

  ngOnInit(): void {
    let data: string | null = localStorage.getItem("vehicleTypes");
    if (data) {
      let jsonObject: any = JSON.parse(data);
      let responses: VehicleTypeResponse[] = <VehicleTypeResponse[]>jsonObject;
      this.vehicleTypes = responses.slice();
    }
  }

  queryVehicleTypes() {
    let observable: Observable<any> = this.manageVehicleTypeService.queryVehicleTypes(
      this.manageVehicleTypeService.buildQuery(vehicleTypes, new Map)
    );

    observable.subscribe(
      (response) => {
        console.log("Response", response);
        this.vehicleTypes = response.data.vehicleTypes as VehicleTypeResponse[];
        localStorage.setItem("vehicleTypes", JSON.stringify(this.vehicleTypes));
        this.dataSource.data = this.vehicleTypes.slice();
        console.log("Success", this.vehicleTypes);
      },
      error => {
        console.log("Error", error);
      },
      () => {
        console.log("Completed.");
      }
    );
  }

  clickedRow(element: VehicleTypeResponse) {
    this.selectedVehicleType = element;
  }

  vehicleTypeDetail(vehicleType: VehicleTypeResponse) {
    console.log(vehicleType);
  }

  addVehicleType() {
    this.create = true;
  }

  removeVehicleType(vehicleType: VehicleTypeResponse) {

  }
}
