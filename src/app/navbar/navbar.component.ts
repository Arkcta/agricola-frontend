import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  mostrar(){
    let flag = document.getElementById("sidebar").className;
    if(flag === "active"){
      document.getElementById("sidebar").className = "";
    }else{
      document.getElementById("sidebar").className = "active";
    }
  }

}
