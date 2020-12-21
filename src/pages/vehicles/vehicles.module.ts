import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';
import { VehiclesCreateComponent } from './vehicles-create/vehicles-create.component';
import {VehiclesRoutingModule} from "./vehicles-routing.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { VehiclesDeleteComponent } from './vehicles-delete/vehicles-delete.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [VehiclesListComponent, VehiclesCreateComponent, VehiclesDeleteComponent],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class VehiclesModule { }
