import { Component, OnInit } from '@angular/core';
import { RegistroFitosanitario } from './registro-fitosanitario';
import { RegistroFitosanitarioService } from './registro-fitosanitario.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-registro-fitosanitario',
  templateUrl: './registro-fitosanitario.component.html',
  styleUrls: ['./registro-fitosanitario.component.css']
})
export class RegistroFitosanitarioComponent implements OnInit {

  registrosFitosanitarios: RegistroFitosanitario[];
  registroFitosanitario: RegistroFitosanitario = new RegistroFitosanitario();

  constructor(private regisFitoService: RegistroFitosanitarioService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.listaRegistroFitoService();
  }

  listaRegistroFitoService() {
    this.regisFitoService.getRegistrosFito().subscribe(
      (regiFito) => {this.registrosFitosanitarios = regiFito}  //se agrega {this.encargadosBPA = encargados, otra cosa} al this cuando hay mas de una linea de codigo tambien al encargados cuando son mas de 1 parametro
    );
  }

  delete(regiFito: RegistroFitosanitario): void {

    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: '¿Seguro que desea eliminar el Registro Fitosanitario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.regisFitoService.deleteRegistroFito(regiFito.idRegistroFitosanitario).subscribe(
          response => {
            this.registrosFitosanitarios = this.registrosFitosanitarios.filter(reFito => reFito !== regiFito);
          }
        )
        swalWithBootstrapButtons.fire(
          'Registro Fitosanitario eliminado!',
          'El Registro Fitosanitario ha sido eliminado.',
          'success'
        )
      } else if (
        result.dismiss === swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'La eliminación del Registro Fitosanitario se canceló',
          'error'
        )
      }
    })
  }

  crear(): void {


    this.regisFitoService.crearRegistroFito(this.registroFitosanitario).subscribe(
      encargado => {
        this.router.navigate(['/registrosFitosanitarios'])
        swal.fire('Nuevo Registro Fitosanitario', 'El Registro Fitosanitario, ha sido creado con éxito', 'success');
        this.listaRegistroFitoService();
      }
    )
  }

  update(): void {
    this.regisFitoService.updateRegistroFito(this.registroFitosanitario).subscribe(
      encargado => {
        this.router.navigate(['/registrosFitosanitarios']);
        swal.fire('Registro Fitosanitario actualizado', 'El registro ha sido actualizado con éxito', 'success');
        this.listaRegistroFitoService();
      }
    )

  }

  cargarRegistroFito(id: number): void {
    this.activatedRoute.params.subscribe(params => {
      //let id = params['run'];
      if (id) {
        this.regisFitoService.getRegistroFito(id).subscribe((reg) => this.registroFitosanitario = reg);
      }
    })
  }

  vaciarInputs() {
    this.registroFitosanitario = new RegistroFitosanitario();
  }
}
