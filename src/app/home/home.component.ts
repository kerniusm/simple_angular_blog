import { Component, OnInit } from '@angular/core';

import { NotifyService } from '../core/notify.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private notify:NotifyService) { }

  ngOnInit() {
  }

  openSnackBar(){
    this.notify.openSnackBar('message', 'success');
  }

}
