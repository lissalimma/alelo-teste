import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string): void{
    this._snackBar.open(message, '', {
      duration: 2000,
      panelClass: ['notif-success']
    });
  }
}
