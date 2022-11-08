import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  uid: string | null;
  uname: string | null;

  ngOnInit(): void {
    this.uid = localStorage.getItem('g_uid')
    this.uname = localStorage.getItem('g_uname')
    console.log(this.uid, this.uname);
  }

}
