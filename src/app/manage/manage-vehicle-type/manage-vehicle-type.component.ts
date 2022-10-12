import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";

import {createVehicleType, ManageVehicleTypeService, removeVehicleType, VehicleTypeResponse, vehicleTypes} from "./manage-vehicle-type.service";
import {MatTableDataSource} from "@angular/material/table";
import {EditVehicleTypeComponent} from "./edit-vehicle-type/edit-vehicle-type.component";

@Component({
  selector: 'app-manage-vehicle-type',
  templateUrl: './manage-vehicle-type.component.html',
  styleUrls: ['./manage-vehicle-type.component.scss']
})
export class ManageVehicleTypeComponent implements OnInit {
  dataSource: MatTableDataSource<VehicleTypeResponse>;
  vehicleTypes: VehicleTypeResponse[] = [];
  current: VehicleTypeResponse | null = null;

  constructor(private manageVehicleTypeService: ManageVehicleTypeService, private editDialog: EditVehicleTypeComponent) {
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

  vehicleTypeDetail(vehicleType: VehicleTypeResponse) {
    this.current = vehicleType;
    console.log("vehicleTypeDetail" + JSON.stringify(this.current));
  }

  addVehicleType() {
    this.editDialog.openDialog();
  }

  removeVehicleType(vehicleType: VehicleTypeResponse) {
    this.current = null;
    console.log("removeVehicleType: " + vehicleType.uuid);
    let valueMap = new Map<string, string>();
    valueMap.set("{typeUUID}", vehicleType.uuid);
    let observable: Observable<any> = this.manageVehicleTypeService.removeVehicleType(
      this.manageVehicleTypeService.buildQuery(removeVehicleType, valueMap)
    );
    observable.subscribe(
      response => console.log("remove-response" + response)
    );
  }
}
