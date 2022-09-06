import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: Menu[] = [{
    titulo: 'DashBoard',
    icon: 'fa-tachometer-alt',
    url: '#',
    submenu: [{
      titulo: 'Dashboard 1',
      icon: 'fa-circle',
      url: '/dashboard1'
    }, {
      titulo: 'Dashboard 2',
      icon: 'fa-circle',
      url: '/dashboard2'
    }, {
      titulo: 'Dashboard 3',
      icon: 'fa-circle',
      url: '/dashboard3'
    },]
  },
  {
    titulo: 'Widgets',
    icon: 'fa-th',
    url: '/widgets',
    submenu: []
  }
  ];
  constructor() { }
}
export interface Menu {
  titulo: string;
  icon: string;
  url?: string;
  submenu: subMenu[];
}
// tslint:disable-next-line: class-name
export interface subMenu {
  titulo: string;
  icon: string;
  url: string;
}


