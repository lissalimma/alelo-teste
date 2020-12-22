import { Component, OnDestroy, OnInit} from '@angular/core';
import { ApiService } from "../../../services/api.service";
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
  deleteId: number;


  constructor(private api: ApiService, private spinner: NgxSpinnerService, private toastr: ToastrService) { }

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
      this.toastr.error("Something Went Wrong!")
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
      this.toastr.error("Something Went Wrong!")
    }));
  }

  getWithPlate(): void {
    if (this.plate.length > 0) {
      this.spinner.show();
      this.subscription.push(this.api.getWithPlate(this.plate).subscribe((response: any) => {
        this.calculatePaginator([]);
        this.vehicles = response;
        this.spinner.hide();
      }, error => {
        this.toastr.error("Something Went Wrong!")
      }));
    } else {
      this.getVehicles(1);
    }

  }

  showDialog(id) {
    this.deleteId = id;
    document.getElementById("modal").style.display = "block";
  }

  ngOnDestroy(): void {
    this.subscription.map(s => s.unsubscribe);
  }


}
