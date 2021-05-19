import { Component, OnInit } from '@angular/core';
import { Administrador } from './administrador';
import { AdministradorService } from './administrador.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import {AuthService} from '../usuarios/auth.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

    administrador: Administrador = new Administrador();
    administradores: Administrador[];

    constructor(private administradorService: AdministradorService, private router: Router,
       private activatedRoute: ActivatedRoute, private authService: AuthService) { }

    ngOnInit(): void {
      this.listaAdministradoresService();
    }

    listaAdministradoresService() {
      this.administradorService.getAdministradores().subscribe(
        (administradores) => this.administradores = administradores
      );
    }

    delete(administrador: Administrador): void {
      const swalWithBootstrapButtons = swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: '¿Estas seguro?',
        text: `¿Seguro que desea eliminar el Administrador ${administrador.nombre}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, estoy seguro',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.administradorService.deleteAdministrador(administrador.run).subscribe(
            response => {
              this.administradores = this.administradores.filter(adm => adm !== administrador);
            }
          )
          swalWithBootstrapButtons.fire(
            'Administrador eliminado!',
            'El Administrador ha sido eliminado.',
            'success'
          )
        } else if (
          result.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'La eliminación del Administrador se canceló',
            'error'
          )
        }
      })
    }

    crear(): void {
      this.administradorService.crearAdministrador(this.administrador).subscribe(
        administrador => {
          this.router.navigate(['/administradores'])
          swal.fire('Nuevo Administrador', `El Administrador ${administrador.nombre}, ha sido creado con éxito`, 'success');
          this.listaAdministradoresService();
        }
      )
    }

    update(): void {
      this.administradorService.updateAdministrador(this.administrador).subscribe(
        administrador => {
          this.router.navigate(['/administradores']);
          swal.fire('Administrador actualizado', `El Administrador ${administrador.nombre}, ha sido actualizado con éxito`, 'success');
          this.administradorService.getAdministradores().subscribe(
            (administradores) => this.administradores = administradores
          );
        }
      )
    }

    cargarAdministrador(run: string): void {
      this.activatedRoute.params.subscribe(params => {
        if (run) {
          this.administradorService.getAdministrador(run).subscribe((administrador) => this.administrador = administrador);
        }
      })
    }

    vaciarInputs() {
      this.administrador = new Administrador();
    }


}
