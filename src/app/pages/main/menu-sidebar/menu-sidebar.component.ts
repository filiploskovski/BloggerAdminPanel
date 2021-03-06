import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { AppService } from 'src/app/utils/services/app.service';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss'],
})
export class MenuSidebarComponent implements OnInit, AfterViewInit {
  @ViewChild('mainSidebar', { static: false }) mainSidebar;
  @Output() mainSidebarHeight: EventEmitter<any> = new EventEmitter<any>();

  public menuItems = [
    { routerLink: '/', name: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { routerLink: '/vipticket', name: 'Vip Ticket', icon: 'fab fa-buffer' },
    { routerLink: '/monthlysubscription', name: 'Monthly Subscription', icon: 'fas fa-fan' },
    { routerLink: '/freetips', name: 'Free Tips', icon: 'fas fa-hand-point-right' },
  ];

  constructor(public appService: AppService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.mainSidebarHeight.emit(this.mainSidebar.nativeElement.offsetHeight);
  }
}
