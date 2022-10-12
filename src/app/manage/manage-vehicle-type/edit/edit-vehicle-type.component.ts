import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Observable} from "rxjs";

import {createVehicleType, GraphqlService, VehicleTypeResponse, vehicleTypes} from "../../../graphql/graphql.service";
import {LocalStoreService} from "../../../graphql/local-store.service";

@Component({
  selector: 'app-edit-vehicle-type',
  templateUrl: '../../../graphql/empty.html',
  styleUrls: ['./edit-vehicle-type.component.scss']
})
export class EditVehicleTypeComponent {
  data: VehicleTypeResponse | null = null;

  constructor(private dialog: MatDialog, private graphqlService: GraphqlService, private storeService: LocalStoreService) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(VehicleTypeEditComponent, {data: {data: this.data}});

    dialogRef.afterClosed().subscribe(result => {
      let response = result as VehicleTypeResponse;
      this.data = {uuid: response.uuid, name: response.name, description: response.description, image: response.image};

      let valueMap = new Map<string, string>();
      valueMap.set("{name}", this.data.name);
      valueMap.set("{description}", this.data.description === undefined ? '' : this.data.description);
      valueMap.set("{image}", this.data.image === undefined ? '' : this.data.image);
      let observable: Observable<any> = this.graphqlService.createVehicleType(
        this.graphqlService.buildQuery(createVehicleType, valueMap)
      );

      observable.subscribe(
        (next) => {
          this.storeService.notify('ManageVehicleTypeComponent');
          let newType = next.data.vehicleTypes as VehicleTypeResponse;
          if (newType) {
            let stored: any | null = this.storeService.loadObject("vehicleTypes");
            if (stored) {
              let storedArray: VehicleTypeResponse[] = <VehicleTypeResponse[]>stored;
              this.storeService.storeObject("vehicleTypes", storedArray.push(newType));
            }
          }
        }
      );
    });
  }
}

@Component({
  selector: 'empty',
  templateUrl: 'edit-vehicle-type.component.html',
})
export class VehicleTypeEditComponent {
  constructor(
    private dialogRef: MatDialogRef<VehicleTypeEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VehicleTypeResponse
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
