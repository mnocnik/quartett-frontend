import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

export interface VehicleDataResponse {
  uuid: string
  created: string
  value: string
  property: VehiclePropertyResponse
  vehicle: VehicleResponse
}

export interface VehiclePropertyResponse {
  uuid: string
  created: string
  name: string
  unitShort: string
  sortIndex: number
  vehicleType: VehicleTypeResponse
  data: VehicleDataResponse[]
}

export interface VehicleTypeResponse {
  uuid: string;
  created: string;
  name: string
  description: string
  image: string
  vehicles: VehicleResponse[]
  properties: VehiclePropertyResponse[]
}

export interface VehicleResponse {
  uuid: string;
  created: string;
  name: string
  image: string
  description: string
  vehicleType: VehicleTypeResponse
  data: VehicleDataResponse[]
}

export const vehicleForUUID: string = `
{
  vehicle(uuid: "{uuid}") {
    uuid
    name
    description
    image
    vehicleType {
      name
      description
      image
    }
    data {
      value
      property {
        name
        unitShort
        sortIndex
      }
    }
  }
}
`;

export const vehicleAll: string = `
{
  vehiclesByType(typeUUID: "{typeUUID}") {
    uuid
    name
    description
    image
    vehicleType {
      uuid
      name
      description
      image
    }
    data {
      uuid
      value
      property {
        name
        sortIndex
        unitShort
      }
    }
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class ManageVehicleTypeService {
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient) {
  }

  postForVehicle(requestBody: object): Observable<VehicleResponse> {
    return this.http.post<VehicleResponse>(
      environment.graphEndpoint,
      JSON.stringify(requestBody),
      {headers: this.headers}
    )
  }

  postForVehicleAll(requestBody: object): Observable<VehicleResponse[]> {
    console.log(requestBody);
    return this.http.post<VehicleResponse[]>(
      environment.graphEndpoint,
      JSON.stringify(requestBody),
      {headers: this.headers}
    )
  }

  buildQuery(pattern: string, map: Map<string, string>): { query: string } {
    for (let entry of map.entries()) {
      pattern = pattern.replace(entry[0], entry[1]);
    }
    return {query: pattern};
  }
}
