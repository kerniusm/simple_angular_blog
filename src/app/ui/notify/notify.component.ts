import { Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';
@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent{

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }


}
