import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  dtOptions: any = {};
  public data:any = '{"data":[{"id":8603,"firstName":"Superman","lastName":"Yoda"},{"id":870,"firstName":"Foo","lastName":"Whateveryournameis"},{"id":590,"firstName":"Toto","lastName":"Titi"}]}';

  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    const that = this;
    this.dtOptions = {
      data: JSON.parse(this.data).data,
      columns: this.gridColums(),
      select: true,
      dom: 'Bfrtip',
      buttons: [
        {
          text: 'Edit',
          action: function (e, dt, node, config) {
            that.edit.emit(dt.rows({selected: true}).data());
          }
        },
        {
          text: 'Delete',
          action: function (e, dt, node, config) {
            that.delete.emit(dt.rows({selected: true}).data());
          }
        }
      ]
    };
  }

  gridColums(){
    let arr = [];
    let keys = Object.keys(JSON.parse(this.data).data[0]);
    keys.forEach((item) => {
        let obj = {
          title: item.toLocaleUpperCase(),
          data: item
        }
        arr.push(obj)
    });
    return arr;
  }
}