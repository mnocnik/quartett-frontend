import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";


export type VehicleDataResponse = {
  created: string
  uuid: string
  value: string
  property: VehiclePropertyResponse
  vehicle: VehicleResponse
}

export type VehiclePropertyResponse = {
  created: string
  uuid: string
  name: string
  unitShort: string
  sortIndex: number
  vehicleType: VehicleTypeResponse
  data: VehicleDataResponse[]
}

export type VehicleTypeResponse = {
  created: string;
  uuid: string;
  name: string
  description: string
  image: string
  vehicles: VehicleResponse[]
  properties: VehiclePropertyResponse[]
}

export type VehicleResponse = {
  created: string;
  uuid: string;
  name: string
  image: string
  description: string
  vehicleType: VehicleTypeResponse
  data: VehicleDataResponse[]
}

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
    return this.http.post<VehicleResponse>(
      environment.graphEndpoint,
      JSON.stringify(body),
      {headers: this.headers}
    )
  }
}
