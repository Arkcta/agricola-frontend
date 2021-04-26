import { Component, OnInit } from '@angular/core';
import { EncargadoBPA } from './encargado-bpa';
import { EncargadoBPAService } from './encargado-bpa.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-encargados-bpa',
  templateUrl: './encargados-bpa.component.html',
  styleUrls: ['./encargados-bpa.component.css']
})
export class EncargadosBPAComponent implements OnInit {


  encargadosBPA: EncargadoBPA[];
  fecha = new Date();


  constructor(private encargadpBPAService: EncargadoBPAService) { }

  ngOnInit(): void {
    this.encargadpBPAService.getEncargados().subscribe(
      (encargados) => this.encargadosBPA = encargados  //se agrega {this.encargadosBPA = encargados} al this cuando hay mas de una linea de codigo tambien al encargados cuando son mas de 1 parametro
    );
  }

  delete(encargado: EncargadoBPA): void {

    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: `¿Seguro que desea eliminar al Encargado BPA ${encargado.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.encargadpBPAService.deleteEncargado(encargado.run).subscribe(
          response => {
            encargado.estado = true;
            this.encargadosBPA = this.encargadosBPA.filter(encar => encar !== encargado);
          }
        )
        swalWithBootstrapButtons.fire(
          'Encargado BPA eliminado!',
          'El encaergado ha sido eliminado.',
          'success'
        )
      } else if (
        result.dismiss === swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'La eliminación del Encargado BPA se canceló',
          'error'
        )
      }
    })
  }
}
