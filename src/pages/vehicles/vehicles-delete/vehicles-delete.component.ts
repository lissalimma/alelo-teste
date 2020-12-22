import { Component, ElementRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-vehicles-delete',
  templateUrl: './vehicles-delete.component.html',
  styleUrls: ['./vehicles-delete.component.scss'],
})
export class VehiclesDeleteComponent implements OnInit, OnDestroy {

  @Output() refresh = new EventEmitter();
  @Input() id: number;
  subscription: Subscription[] = [];


  constructor(private el: ElementRef, private spinner: NgxSpinnerService, private api: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.el.nativeElement.addEventListener('click', () => {
      this.close();
    })
  }

  delete(): void {
    this.spinner.show();
    this.subscription.push(this.api.delete(this.id).subscribe((response: any) => {
      this.spinner.hide();
      this.close();
      this.toastr.success("Vehicle Deleted Successfuly!");
      this.refresh.emit();
    }, error => {
      this.toastr.error("Something Went Wrong!")
    }));
  }

  close() {
    document.getElementById("modal").style.display = "none";
  }

  ngOnDestroy(): void {
    this.subscription.map(s => s.unsubscribe);
  }

}
