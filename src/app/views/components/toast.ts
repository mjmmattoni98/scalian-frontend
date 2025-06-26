import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomToastComponent } from './custom-toast';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private readonly snackBar: MatSnackBar) {}

  show(
    message: string,
    duration: number = 4000,
    type: 'success' | 'error' = 'success'
  ) {
    this.snackBar.openFromComponent(CustomToastComponent, {
      data: { message, type },
      duration,
      verticalPosition: 'top',
    });
  }
}
