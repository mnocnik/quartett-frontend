import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";

import {ManageVehicleTypeService} from "./manage-vehicle-type.service";

@Component({
  selector: 'app-manage-vehicle-type',
  templateUrl: './manage-vehicle-type.component.html',
  styleUrls: ['./manage-vehicle-type.component.scss']
})
export class ManageVehicleTypeComponent implements OnInit {
  title: string = "WORKS: ManageVehicleType";

  constructor(private manageVehicleTypeService: ManageVehicleTypeService) {
  }

  postVehicleRequest() {
    let body = {query: "{ vehicle(uuid: \"b194aaee-089d-4bf0-9feb-311d2c0f62f8\") { uuid name description image vehicleType { name description image } data { value property {  name  unitShort  sortIndex } } }}"};
    let observable: Observable<any> = this.manageVehicleTypeService.preparePost(body);
    observable.subscribe(
      (data: any) => {
        console.log("Success", data.data);
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
