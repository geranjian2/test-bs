import { Component, OnInit } from '@angular/core';
// declare function menu_init();
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'crm';
  ngOnInit(){
    // menu_init();
  }

}
