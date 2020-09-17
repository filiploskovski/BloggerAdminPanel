import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatchesService } from 'src/app/utils/services/matches.service';

@Component({
  selector: 'app-vipticket',
  templateUrl: './vipticket.component.html',
  styleUrls: ['./vipticket.component.scss'],
})
export class VipticketComponent implements OnInit {
  public EDIT_FLAG = true;
  public GRID_FLAG = false;

  generateVipTicketForm = new FormGroup({
    generateVipTicketDate: new FormControl('',[Validators.required]),
  });

  public tableMatches: any;
  public geratedVipTicketTotalWin = 1;

  constructor(private matchesService: MatchesService) {}

  ngOnInit(): void {
  }

  changeMenu(menu) {
    if (menu == 1) {
      this.EDIT_FLAG = true;
      this.GRID_FLAG = false;
    } else {
      this.EDIT_FLAG = false;
      this.GRID_FLAG = true;
    }
  }

  onKey(event: any) { 
    this.geratedVipTicketTotalWin = (event.target.value * this.tableMatches.TotalOdd); 
  }

  GenerateVipTicketSubmit(){
      this.tableMatches = this.matchesService.generatetVipTicket(this.generateVipTicketForm.value.generateVipTicketDate);
  }

  GenerateVipTicketTemplates(){
  }

  edit(data) {
    this.changeMenu(1);
    console.log(data);
  }
  delete(data) {
    console.log(data);
  }
}
