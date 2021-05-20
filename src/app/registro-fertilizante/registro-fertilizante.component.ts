import { Component, OnInit } from '@angular/core';
import { RegistroFertilizante } from './registro-fertilizante';
import { RegistroFertilizanteService } from './registro-fertilizante.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-registro-fertilizante',
  templateUrl: './registro-fertilizante.component.html',
  styleUrls: ['./registro-fertilizante.component.css']
})
export class RegistroFertilizanteComponent implements OnInit {
  registro:RegistroFertilizante = new RegistroFertilizante ();
  registros: RegistroFertilizante[];

constructor(private registroService: RegistroFertilizanteService,
  private router: Router, private activatedRoute: ActivatedRoute , public authService: AuthService) { }

 ngOnInit(): void {
   this.listaRegistrosService();
 }

 listaRegistrosService() {
    this.registroService.getRegistrosFertilizantes().subscribe(
      (registros) => this.registros = registros
      );
  }

  delete(registro: RegistroFertilizante): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: `¿Seguro que desea eliminar el Registro Fertilizante?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.registroService.deleteRegistroFertilizantes(registro.idRegistro).subscribe(
          response => {
            this.registros = this.registros.filter(r=> r !== registro);
          }
        )
        swalWithBootstrapButtons.fire(
          'Registro Fertilizante eliminado!',
          'El registro ha sido eliminado.',
          'success'
        )
      } else if (
        result.dismiss === swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'La eliminación del registro se canceló',
          'error'
        )
      }
    })
  }

  crear(): void {
    this.registroService.crearRegistroFertilizantes(this.registro).subscribe(
      registro => {
        this.router.navigate(['/registrosFertilizantes'])
        swal.fire('Nuevo Registro Fertilizante', `El Registro Fitosanitario, ha sido creado con éxito`, 'success');
        this.listaRegistrosService();
      }
    )
  }

  update(): void {
    this.registroService.updateRegistroFertilizantes(this.registro).subscribe(
     registro => {
        this.router.navigate(['/registrosFertilizantes']);
        swal.fire('Registro Fertilizante actualizado', `El Registro Fertilizante, ha sido actualizado con éxito`, 'success');
        this.registroService.getRegistrosFertilizantes().subscribe(
          (registros) => this.registros = registros
          );
      }
    )
  }

  cargarRegistroFertilizante(id: number): void {
    this.activatedRoute.params.subscribe(params => {

      if (id) {
        this.registroService.getRegistroFertilizante(id).subscribe((registro) => this.registro= registro);
      }
    })
  }

  vaciarInputs() {
    this.registro= new RegistroFertilizante();
  }
 }
