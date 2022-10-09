import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-manage-vehicle-type',
  templateUrl: './manage-vehicle-type.component.html',
  styleUrls: ['./manage-vehicle-type.component.scss']
})
export class ManageVehicleTypeComponent implements OnInit {
  title: string = "WORKS: ManageVehicleType";
  graphEndpoint: string = "http://localhost:8081/quartett/graphql";
  requestVehicle: Observable<Object> | undefined;

  constructor(private http: HttpClient) {
  }

  postVehicleRequest() {
    this.requestVehicle?.subscribe(
      (data: Object) => {
        console.log("Success", data);
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
    let body = {query: "{ vehicle(uuid: \"b194aaee-089d-4bf0-9feb-311d2c0f62f8\") { uuid name description image vehicleType { name description image } data { value property {  name  unitShort  sortIndex } } }}"};
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    this.requestVehicle = this.http.post(
      this.graphEndpoint,
      JSON.stringify(body),
      {headers: headers}
    )
    // .subscribe(
    //   (val) => {
    //     console.log("POST call successful value returned in body",
    //       val);
    //   },
    //   response => {
    //     console.log("POST call in error", response);
    //   },
    //   () => {
    //     console.log("The POST observable is now completed.");
    //   })
    ;
  }

}
