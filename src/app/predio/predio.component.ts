import { Component, OnInit } from '@angular/core';
import { Predio } from './predio';
import { PredioService } from './predio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CamposService } from '../campos/campos.service';
import swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Campos } from '../campos/campos';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-predio',
  templateUrl: './predio.component.html',
  styleUrls: ['./predio.component.css'],
})
export class PredioComponent implements OnInit {
  predio: Predio = new Predio();
  predios: Predio[];
  camposSelect: Observable<Campos[]> = this.campoService.getCampos();
  arraysCampos: Array<Campos> = [];

  constructor(
    private predioService: PredioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private campoService: CamposService
  ) {
    // this.listaCamposService();
  }

  ngOnInit(): void {
    this.listaEncargadosService();
    this.camposSelect.subscribe(campos => {
      campos.forEach(campo =>{
        this.arraysCampos.push(campo);
      })
    });
    this.mostrar();
  }

  // listaCamposService() {
  //   this.campoService.getCampos().subscribe(
  //     campos => {
  //       this.camposSelect = campos;
  //     }   
  //   );   
  // }

  mostrar(){
    console.log(this.arraysCampos);
  }

  listaEncargadosService() {
    this.predioService.getPredios().subscribe(
      (predios) => (this.predios = predios) //se agrega {this.encargadosBPA = encargados, otra cosa} al this cuando hay mas de una linea de codigo tambien al encargados cuando son mas de 1 parametro
    );
  }

  delete(predio: Predio): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: '¿Estas seguro?',
        text: `¿Seguro que desea eliminar el Predio ${predio.nombre}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, estoy seguro',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.predioService
            .deletePredio(predio.idPredio)
            .subscribe((response) => {
              this.predios = this.predios.filter((pre) => pre !== predio);
            });
          swalWithBootstrapButtons.fire(
            '¡Predio eliminado!',
            'El Predio ha sido eliminado con éxito.',
            'success'
          );
        } else if (result.dismiss === swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'La eliminación del Predio se canceló',
            'error'
          );
        }
      });
  }

  crear(): void {
    this.predioService.crearPredio(this.predio).subscribe((json) => {
      this.router.navigate(['/predios']);
      swal.fire(
        'Nuevo Predio',
        `El Predio ${json.predio.nombre} ha sido creado con éxito`,
        'success'
      );
      this.listaEncargadosService();
    });
  }

  update(): void {
    this.predioService.updatePredio(this.predio).subscribe((predio) => {
      this.router.navigate(['/predios']);
      swal.fire(
        'Predio actualizado',
        `El Predio ${predio.nombre} ha sido actualizado con éxito`,
        'success'
      );
      this.predioService.getPredios().subscribe(
        (predios) => (this.predios = predios) //se agrega {this.encargadosBPA = encargados} al this cuando hay mas de una linea de codigo tambien al encargados cuando son mas de 1 parametro
      );
    });
  }

  cargarPredio(id: number): void {
    this.activatedRoute.params.subscribe((params) => {
      //let id = params['id'];
      if (id) {
        this.predioService
          .getPredio(id)
          .subscribe((predio) => (this.predio = predio));
      }
    });
  }

  //metodo que vacia el form para crear
  vaciarInputs() {
    this.predio = new Predio();
  }

  enviarId(value:string){
    console.log("valoorr:" + value);
  }
}
