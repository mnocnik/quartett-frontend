import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-manage-vehicle-type',
  templateUrl: './manage-vehicle-type.component.html',
  styleUrls: ['./manage-vehicle-type.component.scss']
})
export class ManageVehicleTypeComponent implements OnInit {
  title: string = "WORKS: ManageVehicleType";

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    let body = {query: "{ vehicle(uuid: \"b194aaee-089d-4bf0-9feb-311d2c0f62f8\") { uuid name description image vehicleType { name description image } data { value property {  name  unitShort  sortIndex } } }}"};
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    this.http.post(
      "http://localhost:8081/quartett/graphql",
      JSON.stringify(body),
      {headers: headers}
    )
      .subscribe(
        (val) => {
          console.log("POST call successful value returned in body",
            val);
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

}
