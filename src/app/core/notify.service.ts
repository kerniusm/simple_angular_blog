import { Injectable } from '@angular/core';

import {MatSnackBar} from '@angular/material';
import { NotifyComponent } from '../ui/notify/notify.component';

@Injectable()
export class NotifyService {

  constructor(public snackBar: MatSnackBar) { }

  openSnackBar(message: string, action:string) {
    let data = {
      message: message,
      action: action
    }
    this.snackBar.openFromComponent(NotifyComponent,{
      duration: 4000,
      data: data,
      panelClass: ['right-side-snack']
    });
  }
}
