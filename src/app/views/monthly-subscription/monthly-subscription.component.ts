import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchesService } from 'src/app/utils/services/matches.service';
import { NotifyService } from 'src/app/utils/services/notify.service';
import { ApiService } from 'src/app/utils/services/api.service';
import { ApproveMatchesModel } from 'src/app/utils/models/ApproveMatchesModel';
import { DatePipe } from '@angular/common';
import { GridComponent } from 'src/app/components/grid/grid.component';

@Component({
  selector: 'app-monthly-subscription',
  templateUrl: './monthly-subscription.component.html',
  styleUrls: ['./monthly-subscription.component.scss'],
})
export class MonthlySubscriptionComponent implements OnInit {
  @ViewChild(GridComponent) gridComponent:GridComponent;
  public EDIT_FLAG = true;
  public GRID_FLAG = false;
  public gridData = [];

  generateMSForm = new FormGroup({
    date: new FormControl('', [Validators.required]),
  });

  createUpdate = new FormGroup({
    Id: new FormControl('', [Validators.required]),
    Date: new FormControl(new Date(), [Validators.required]),
    Description: new FormControl('', [Validators.required]),
    Match: new FormControl('', [Validators.required]),
    Tip: new FormControl('', [Validators.required]),
    Odd: new FormControl('', [Validators.required]),
    Result: new FormControl('', [Validators.required]),
    WinLose: new FormControl('', [Validators.required]),
  });

  public tableMatches: ApproveMatchesModel;

  constructor(
    private matchesService: MatchesService,
    private apiService: ApiService,
    private datePipe: DatePipe,
    private notifyService: NotifyService
  ) {}

  ngOnInit(): void {
    this.PageLoad();
  }

  PageLoad() {
    this.apiService.MonthlySubscriptionLoad().subscribe({
      next: (item: any) => {
        this.gridData = item.Matches;
      },
      complete:() => {
      }
    });
  }

  GenerateMS() {
    this.tableMatches = this.matchesService.generateMonthlySubscription(
      this.generateMSForm.value.date
    );
  }

  Approve() {
    this.apiService
      .MonthlySubscriptionApproveMatches(this.tableMatches)
      .subscribe({
        next: () => {},
        complete: () => {
          this.PageLoad();
          this.notifyService.showDefaultSuccess();
        },
      });
  }

  edit($event) {
    $event.Date = this.datePipe.transform($event.Date, 'yyyy-MM-dd');
    this.createUpdate.setValue($event);
    this.changeMenu(1);
  }

  EditDatabase() {
    this.apiService
      .MonthlySubscriptionCreateOrUpdate(this.createUpdate.value)
      .subscribe({
        next: () => {},
        complete: () => {
          this.PageLoad();
          this.notifyService.showDefaultSuccess()},
        error: () => {},
      });
  }

  delete(data) {
    for (let i = 0; i < data.length; i++) {
      this.apiService.MonthlySubscriptionDelete(data[i].Id).subscribe({
        next: () => {},
        complete: () => {
          this.PageLoad();
          this.notifyService.showDefaultSuccess()
        },
        error: () => {},
      });
    }
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
}
