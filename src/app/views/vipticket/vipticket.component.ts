import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vipticket',
  templateUrl: './vipticket.component.html',
  styleUrls: ['./vipticket.component.scss'],
})
export class VipticketComponent implements OnInit {
  public EDIT_FLAG = true;
  public GRID_FLAG = false;

  constructor() {}

  ngOnInit(): void {}

  changeMenu(menu) {
    if (menu == 1) {
      this.EDIT_FLAG = true;
      this.GRID_FLAG = false;
    } else {
      this.EDIT_FLAG = false;
      this.GRID_FLAG = true;
    }
  }
}
