import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: any = {};
  @Input() data: any;
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() multipleLogic: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    const that = this;
    this.dtOptions = {
      dom: 'Bfrtip',
      //data: this.data,
      serverSide: true,
      ajax: {
        url: 'https://localhost:5001/api/monthly-subscription',
        type: 'POST',
        contentType: "application/json",
        datatype:'json',
        dataSrc: "MatchesDataTable"
      },
      columns: this.gridColums(),
      select: true,
      ordering: true,
      lengthMenu: [
        [10, 25, 50, -1],
        ['10 rows', '25 rows', '50 rows', 'Show all'],
      ],
      buttons: [
        'pageLength',
        {
          text: 'Edit',
          action: function (e, dt, node, config) {
            const data = dt.rows({ selected: true }).data();
            if (data.length != 1) {
              alert('Select one element');
            } else {
              that.edit.emit(data[0]);
            }
          },
        },
        {
          text: 'Delete',
          action: function (e, dt, node, config) {
            that.delete.emit(dt.rows({ selected: true }).data());
          },
        },
        {
          text: 'InsertFreeTips',
          action: function (e, dt, node, config) {
            that.multipleLogic.emit(dt.rows({ selected: true }).data());
          },
        },
      ],
    };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  gridColums() {
    let arr = [];
    let keys = Object.keys(this.data[0]);
    keys.forEach((item) => {
      let obj = {
        title: item.toLocaleUpperCase(),
        data: item,
      };
      arr.push(obj);
    });
    return arr;
  }
}
