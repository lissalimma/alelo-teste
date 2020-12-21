import { Component, Inject, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-vehicles-delete',
  templateUrl: './vehicles-delete.component.html',
  styleUrls: ['./vehicles-delete.component.scss']
})
export class VehiclesDeleteComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<VehiclesDeleteComponent>) { }

  ngOnInit(): void {
  }

  delete(boolean) {
    this.dialogRef.close({delete: boolean});
  }

}
