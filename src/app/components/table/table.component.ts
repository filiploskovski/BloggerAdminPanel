import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() data:any;
  public headers:any = [];
  
  constructor() { }

  ngOnInit(): void {
    console.log(this.data);
    
    if(this.data !== undefined)
      this.headers = Object.keys(this.data[0])
    
    console.log(this.headers);
    console.log(this.data);
   
  }

  

}
