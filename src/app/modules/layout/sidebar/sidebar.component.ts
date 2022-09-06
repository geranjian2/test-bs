import { Component, OnInit } from '@angular/core';
import { timeout } from 'rxjs';
import { SidebarService } from 'src/app/service/service.index';
declare function menu_init():any

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  constructor(
    public sidebarService: SidebarService,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      // menu_init();
    }, 1000);
  }

}
