import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Observable} from "rxjs";

import {ManageVehiclesService, vehicleAll, vehicleForUUID, VehicleResponse, VehicleTypeResponse} from "./manage-vehicles.service";
import {environment} from "../../../environments/environment";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-manage-vehicles',
  templateUrl: './manage-vehicles.component.html',
  styleUrls: ['./manage-vehicles.component.scss']
})
export class ManageVehiclesComponent implements AfterViewInit {
  vehicleResponse: VehicleResponse | undefined;
  vehicles: VehicleResponse[] = [];
  vehicleTypes: VehicleTypeResponse[] = [];
  dataSourceTypes: MatTableDataSource<VehicleTypeResponse>;
  dataSource: MatTableDataSource<VehicleResponse>;

  displayedColumns: string[] = ['name', 'description', 'image'];
  clickedElement: VehicleResponse | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private manageVehicleTypeService: ManageVehiclesService) {
    this.dataSource = new MatTableDataSource(this.vehicles.slice());
    this.dataSourceTypes = new MatTableDataSource(this.vehicleTypes.slice());
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  matSortChange(sortState: Sort) {
    const data = this.vehicles.slice();
    if (!sortState.active || sortState.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sortState.direction === 'asc';
      switch (sortState.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'description':
          return this.compare(a.description, b.description, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  ngAfterViewInit() {
    if (this.sort) {
      this.dataSource.sort = this.sort;
      console.log("Completed: SORT");
    }
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
      console.log("Completed: PAGINATOR");
    }
  }

  postVehicleRequest() {
    let valueMap = new Map<string, string>();
    valueMap.set("{uuid}", "39abf90e-1860-49fc-bf12-50ce947f5249");

    let observable: Observable<any> = this.manageVehicleTypeService.postForVehicle(
      this.manageVehicleTypeService.buildQuery(vehicleForUUID, valueMap)
    );

    observable.subscribe(
      (response) => {
        this.vehicleResponse = response.data.vehicle as VehicleResponse;
        console.log("Success", this.vehicleResponse);
      },
      error => {
        console.log("Error", error);
      },
      () => {
        console.log("Completed.");
      }
    );
  }

  fetchVehicleTypeShip() {
    let valueMap = new Map<string, string>();
    valueMap.set("{typeUUID}", environment.shipTypeUUID)

    let observable: Observable<any> = this.manageVehicleTypeService.postForVehicleAll(
      this.manageVehicleTypeService.buildQuery(vehicleAll, valueMap)
    );

    observable.subscribe(
      (response) => {
        this.vehicles = response.data.vehiclesByType as VehicleResponse[];
        this.dataSource.data = this.vehicles.slice();
        console.log("Success", this.vehicles);
      },
      error => {
        console.log("Error", error);
      },
      () => {
        console.log("Completed.");
      }
    );
  }

  queryVehicleTypes() {
    let observable: Observable<any> = this.manageVehicleTypeService.postForVehicleAll(
      this.manageVehicleTypeService.buildQuery(vehicleAll, new Map)
    );

    observable.subscribe(
      (response) => {
        this.vehicleTypes = response.data.vehiclesByType as VehicleTypeResponse[];
        this.dataSourceTypes.data = this.vehicleTypes.slice();
        console.log("Success", this.vehicleTypes);
      },
      error => {
        console.log("Error", error);
      },
      () => {
        console.log("Completed.");
      }
    );
  }

  clickedRow(element: VehicleResponse) {
    this.clickedElement = element;
  }
}
