import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.scss']
})
export class VehiclesListComponent implements OnInit {

  vehicles

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getVehicles(1);
  }

  getVehicles(page){
    this.api.getVehicles(page, 10).subscribe((response: any) => {
      this.vehicles = response;
    }, error => {
      // msg
    });
  }

}
