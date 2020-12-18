import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';
import { VehiclesCreateComponent } from './vehicles-create/vehicles-create.component';
import {VehiclesRoutingModule} from "./vehicles-routing.module";



@NgModule({
  declarations: [VehiclesListComponent, VehiclesCreateComponent],
  imports: [
    CommonModule,
    VehiclesRoutingModule
  ]
})
export class VehiclesModule { }
