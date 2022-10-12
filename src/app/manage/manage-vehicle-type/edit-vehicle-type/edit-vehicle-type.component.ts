import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {createVehicleType, ManageVehicleTypeService, VehicleTypeResponse, vehicleTypes} from "../manage-vehicle-type.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-edit-vehicle-type',
  templateUrl: './edit-vehicle-type.component.html',
  styleUrls: ['./edit-vehicle-type.component.scss']
})
export class EditVehicleTypeComponent {
  data: VehicleTypeResponse | null = null;

  constructor(private dialog: MatDialog, private manageVehicleTypeService: ManageVehicleTypeService) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(VehicleTypeEditComponent, {
      width: '250px',
      data: {data: this.data},
    });

    dialogRef.afterClosed().subscribe(result => {
      let response = result as VehicleTypeResponse;
      this.data = {name: response.name, description: response.description, image: response.image, uuid: response.uuid, created: '', vehicles: [], properties: []};

      let valueMap = new Map<string, string>();
      valueMap.set("{name}", this.data.name);
      valueMap.set("{description}", this.data.description);
      valueMap.set("{image}", this.data.image);
      let observable: Observable<any> = this.manageVehicleTypeService.createVehicleType(
        this.manageVehicleTypeService.buildQuery(createVehicleType, valueMap)
      );

      observable.subscribe(
        (response) => {
          console.log("Response", response);
          let newType = response.data.vehicleTypes as VehicleTypeResponse;
          if (newType) {
            let stored: string | null = localStorage.getItem("vehicleTypes");
            if (stored) {
              let storedObjects: any = JSON.parse(stored);
              let storedArray: VehicleTypeResponse[] = <VehicleTypeResponse[]>storedObjects;
              storedArray.push(newType);
              localStorage.setItem("vehicleTypes", JSON.stringify(storedArray));
            }
          }
          console.log("Success");
        },
        error => {
          console.log("Error", error);
        },
        () => {
          console.log("Completed.");
        }
      );

    });
  }
}

@Component({
  selector: 'vehicle-type-detail-dialog',
  templateUrl: 'vehicle-type-detail.component.html',
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
