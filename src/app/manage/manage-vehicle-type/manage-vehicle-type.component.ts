import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";

import {EditVehicleTypeComponent} from "./edit-vehicle-type/edit-vehicle-type.component";
import {GraphqlService, removeVehicleType, VehicleTypeResponse, vehicleTypes} from "../../graphql/graphql.service";
import {LocalStoreService} from "../../graphql/local-store.service";

@Component({
  selector: 'app-manage-vehicle-type',
  templateUrl: './manage-vehicle-type.component.html',
  styleUrls: ['./manage-vehicle-type.component.scss']
})
export class ManageVehicleTypeComponent implements OnInit {
  dataSource: MatTableDataSource<VehicleTypeResponse>;
  vehicleTypes: VehicleTypeResponse[] = [];
  current: VehicleTypeResponse | null = null;

  constructor(private editDialog: EditVehicleTypeComponent, private graphqlService: GraphqlService, private storeService: LocalStoreService) {
    this.dataSource = new MatTableDataSource(this.vehicleTypes.slice());
    this.storeService.listen().subscribe(
      (event: any) => {
        if (event === 'ManageVehicleTypeComponent') {
          this.queryVehicleTypes();
        }
      }
    );
  }

  ngOnInit(): void {
    let stored = this.storeService.loadObject("vehicleTypes");
    this.vehicleTypes = <VehicleTypeResponse[]>stored;
  }

  queryVehicleTypes() {
    let observable: Observable<any> = this.graphqlService.queryVehicleTypes(
      this.graphqlService.buildQuery(vehicleTypes, new Map)
    );

    observable.subscribe(next => {
      this.vehicleTypes = next.data.vehicleTypes as VehicleTypeResponse[];
      this.storeService.storeObject("vehicleTypes", this.vehicleTypes);
      this.dataSource.data = this.vehicleTypes.slice();
    });
  }

  vehicleTypeDetail(vehicleType: VehicleTypeResponse) {
    this.current = vehicleType;
  }

  addVehicleType() {
    this.editDialog.openDialog();
  }

  removeVehicleType(vehicleType: VehicleTypeResponse) {
    this.current = null;
    let valueMap = new Map<string, string>();
    valueMap.set("{typeUUID}", vehicleType.uuid);
    let observable: Observable<any> = this.graphqlService.removeVehicleType(
      this.graphqlService.buildQuery(removeVehicleType, valueMap)
    );
    observable.subscribe(
      () => this.storeService.notify('ManageVehicleTypeComponent')
    );
  }
}
