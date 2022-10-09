import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ManageVehicleTypeService {
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient) {
  }

  experimental() {
    console.log("experimental:", environment.graphEndpoint);
  }

  preparePost(body: object) {
    return this.http.post(
      environment.graphEndpoint,
      JSON.stringify(body),
      {headers: this.headers}
    )
  }
}
