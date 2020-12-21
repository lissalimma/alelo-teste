import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import { MatDialog } from '@angular/material/dialog';
import { VehiclesDeleteComponent } from '../vehicles-delete/vehicles-delete.component';
import { ToastrService } from 'src/services/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

export interface Vehicle {
  plate: string,
  model: string,
  manufacturer: string,
  status: boolean
}

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.scss']
})
export class VehiclesListComponent implements OnInit, OnDestroy {

  vehicles: Vehicle;
  plate: string;
  page: number = 1;
  paginatorLength: any = [];
  subscription: Subscription[] = [];

  constructor(private api: ApiService, public dialog: MatDialog, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getVehicles(this.page);
  }


  //a api que busca os veiculos de forma paginada nao retorna a quantidade de veiculos no total,
  //tornando necessário essa funcao
  getAllVehiclesLength(): void {
    this.subscription.push(this.api.getAllVehicles().subscribe((response: any) => {
      this.calculatePaginator(response);
      this.spinner.hide();
    }, error => {
      this.toastr.openSnackBar('Something Went Wrong!');
    }));
  }

  calculatePaginator(response: Object): void {
    let rows: any = response;
    this.paginatorLength = rows.length / 10;
    this.paginatorLength = this.paginatorLength.toFixed(0);
    this.paginatorLength = parseInt(this.paginatorLength);

    // foi informado que a api retornaria no maximo 5 paginas, porem a funcao 
    //getAllVehiclesLength esta retornando mais de 90 registros. Sendo assim limitei manualmente
    if (this.paginatorLength > 5) {
      this.paginatorLength = 5;
    }
  }

  getVehicles(page: number): void {
    this.spinner.show();
    this.page = page;
    this.subscription.push(this.api.getVehicles(page, 10).subscribe((response: any) => {
      this.vehicles = response;
      this.getAllVehiclesLength();
    }, error => {
      this.toastr.openSnackBar('Something Went Wrong!');
    }));
  }

  getWithPlate(): void {
    this.spinner.show();
    this.subscription.push(this.api.getWithPlate(this.plate).subscribe((response: any) => {
      this.calculatePaginator([]);
      this.vehicles = response;
      this.spinner.hide();
    }, error => {
      this.toastr.openSnackBar('Something Went Wrong!');
    }));
  }

  delete(id: number): void {
    this.spinner.show();
    this.subscription.push(this.api.delete(id).subscribe((response: any) => {
      this.toastr.openSnackBar('Vehicle Successfully Deleted!');
      this.spinner.hide();
      this.getVehicles(1);
    }, error => {
      this.toastr.openSnackBar('Something Went Wrong!');
    }));
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(VehiclesDeleteComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.delete) {
        this.delete(id);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.map(s => s.unsubscribe);
  }

}
