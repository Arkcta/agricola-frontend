import { Component } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public authService: AuthService, public router:Router) { }

 logout(){
   let username = this.authService.usuario.nombre;
     swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.authService.logout();
    this.router.navigate(['/login']);

 }

  mostrar() {
    let flag = document.getElementById("sidebar").className;
    if (flag === "active") {
      document.getElementById("sidebar").className = "";
    } else {
      document.getElementById("sidebar").className = "active";
    }
  }

}
