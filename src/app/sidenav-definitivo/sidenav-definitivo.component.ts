import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav-definitivo',
  templateUrl: './sidenav-definitivo.component.html',
  styleUrls: ['./sidenav-definitivo.component.css']
})
export class SidenavDefinitivoComponent implements OnInit {


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
