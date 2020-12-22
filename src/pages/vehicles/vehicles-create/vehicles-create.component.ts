import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/services/api.service';
import { ToastrService } from 'src/services/toastr.service';

@Component({
  selector: 'app-vehicles-create',
  templateUrl: './vehicles-create.component.html',
  styleUrls: ['./vehicles-create.component.scss']
})
export class VehiclesCreateComponent implements OnInit, OnDestroy {

  id: number;
  form: FormGroup;
  vehicle: Object;
  teste = false;
  subscription: Subscription[] = [];

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private api: ApiService,
    private router: Router, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        if (params['id']) {
          this.id = params['id'];
          this.getVehicleById();
        }
      }
    );

    this.form = this.fb.group({
      id: [''],
      manufacturer: ['', Validators.required],
      model: ['', Validators.required],
      plate: ['', Validators.required],
      status: ['', Validators.required],
      color: ['', Validators.required],
    });


  }

  getVehicleById(): void {
    this.spinner.show();
    this.subscription.push(this.api.getVehicleById(this.id).subscribe((response: any) => {
      this.form.patchValue(response);
      this.spinner.hide();
    }, error => {
      this.toastr.openSnackBar('Something Went Wrong!');
    }));
  }

  save(): void {
    if (this.form.valid) {
      this.spinner.show();
      this.subscription.push(this.api.create(this.form.value).subscribe((response: any) => {
        this.toastr.openSnackBar('Vehicle Inserted Successfully!')
        this.router.navigate(['']);
        this.spinner.hide();
      }, error => {
        this.toastr.openSnackBar('Something Went Wrong!');
      }));
    }
  }

  update(): void {
    if (this.form.valid) {
      this.spinner.show();
      this.subscription.push(this.api.update(this.form.value).subscribe((response: any) => {
        this.toastr.openSnackBar('Vehicle Successfully Changed!');
        this.router.navigate(['']);
        this.spinner.hide();
      }, error => {
        this.toastr.openSnackBar('Something Went Wrong!');
      }));
    }
  }

  ngOnDestroy(): void {
    this.subscription.map(s => s.unsubscribe);
  }



}
