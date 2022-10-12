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

export const vehicleTypes: string = `
{
  vehicleTypes {
    uuid
    name
    description
    image
  }
}`;
export const createVehicleType: string = `mutation {createVehicleType(input: { name: \"{name}\", description: \"{description}\", image: \"{image}\"}) {uuid name description image}}`;
export const removeVehicleType: string = `mutation {removeVehicleType(typeUUID: \"{typeUUID}\")}`;

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

  createVehicleType(requestBody: object): Observable<VehicleResponse[]> {
    console.log("createVehicleType: " + requestBody);
    return this.http.post<VehicleResponse[]>(
      environment.graphEndpoint,
      JSON.stringify(requestBody),
      {headers: this.headers}
    )
  }

  removeVehicleType(requestBody: object): Observable<VehicleResponse[]> {
    console.log("removeVehicleType: " + requestBody);
    return this.http.post<VehicleResponse[]>(
      environment.graphEndpoint,
      JSON.stringify(requestBody),
      {headers: this.headers}
    )
  }

  queryVehicleTypes(requestBody: object): Observable<VehicleTypeResponse[]> {
    console.log("queryVehicleTypes: " + JSON.stringify(requestBody));
    return this.http.post<VehicleTypeResponse[]>(
      environment.graphEndpoint,
      JSON.stringify(requestBody),
      {headers: this.headers}
    )
  }

  buildQuery(pattern: string, map: Map<string, string>): { query: string } {
    for (let entry of map.entries()) {
      pattern = pattern.replace(entry[0], entry[1]);
    }
    console.log("pattern: " + pattern);
    return {query: pattern};
  }
}
