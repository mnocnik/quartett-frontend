import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

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
