import { Component, OnInit } from '@angular/core';
import {AuthService} from '../usuarios/auth.service'
@Component({
  selector: 'app-sidenav-definitivo',
  templateUrl: './sidenav-definitivo.component.html',
  styleUrls: ['./sidenav-definitivo.component.css']
})
export class SidenavDefinitivoComponent {


  constructor(public  authService:AuthService) { }






}
