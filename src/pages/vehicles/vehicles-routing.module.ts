
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehiclesCreateComponent } from './vehicles-create/vehicles-create.component';
import {VehiclesListComponent} from "./vehicles-list/vehicles-list.component";


const routes: Routes = [
  { path: '', component: VehiclesListComponent },
  { path: 'vehicles/create', component: VehiclesCreateComponent },
  { path: 'vehicles/create/:id', component: VehiclesCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }
