import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatchesService } from 'src/app/utils/services/matches/matches.service';

@Component({
  selector: 'app-free-tips',
  templateUrl: './free-tips.component.html',
  styleUrls: ['./free-tips.component.scss']
})
export class FreeTipsComponent implements OnInit {
  public EDIT_FLAG = true;
  public GRID_FLAG = false;

  generateVipTicketForm = new FormGroup({
    generateVipTicketDate: new FormControl('',[Validators.required]),
  });

  constructor(private matchesService: MatchesService) { }

  ngOnInit(): void {
  }
  
  GenerateVipTicketSubmit(){
    console.log(this.generateVipTicketForm.value.generateVipTicketDate) 
    console.log(this.matchesService.generateFreeTips(this.generateVipTicketForm.value.generateVipTicketDate));
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

  multipleLogic($event){}

}
