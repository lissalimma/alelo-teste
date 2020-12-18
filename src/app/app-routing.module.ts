import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VehiclesListComponent} from "../pages/vehicles/vehicles-list/vehicles-list.component";


const routes: Routes = [
  {path: '', redirectTo: 'vehicles', pathMatch: 'full'},
  {path: '', component: VehiclesListComponent},
  {path: 'vehicles', loadChildren: () => import('../pages/vehicles/vehicles.module').then(m => m.VehiclesModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
