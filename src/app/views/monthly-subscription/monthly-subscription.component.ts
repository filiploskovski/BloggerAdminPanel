import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchesService } from 'src/app/utils/services/matches.service';

@Component({
  selector: 'app-monthly-subscription',
  templateUrl: './monthly-subscription.component.html',
  styleUrls: ['./monthly-subscription.component.scss']
})
export class MonthlySubscriptionComponent implements OnInit {

  public EDIT_FLAG = true;
  public GRID_FLAG = false;

  generateMSForm = new FormGroup({
    date: new FormControl('',[Validators.required]),
  });

  public tableHeaders = [];
  public tableMatches: any;

  constructor(private matchesService: MatchesService) { }

  ngOnInit(): void {
  }

  changeMenu(menu){
    if (menu == 1) {
      this.EDIT_FLAG = true;
      this.GRID_FLAG = false;
    } else {
      this.EDIT_FLAG = false;
      this.GRID_FLAG = true;
    }
  }

  GenerateMS(){
   this.tableMatches = this.matchesService.generateMonthlySubscription(this.generateMSForm.value.date);
   this.tableHeaders = Object.keys(this.tableMatches.list[0]);
  }

  Approve(){
  }

  edit(data) {
    this.changeMenu(1);
    console.log(data);
  }
  delete(data) {
    console.log(data);
  }

}
