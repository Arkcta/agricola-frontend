import { Component, OnInit } from '@angular/core';
import { ProductoFertilizante } from './producto-fertilizante';
import { ProductoFertilizanteService } from './producto-fertilizante.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-producto-fertilizante',
  templateUrl: './producto-fertilizante.component.html',
  styleUrls: ['./producto-fertilizante.component.css']
})
export class ProductoFertilizanteComponent implements OnInit {

    fertilizante: ProductoFertilizante = new ProductoFertilizante();
    fertilizantes: ProductoFertilizante[];

    constructor(private fertilizanteService: ProductoFertilizanteService, private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
      this.listaFertilizantesService();
    }

    listaFertilizantesService() {
      this.fertilizanteService.getFertilizantes().subscribe(
        (fertilizantes) => this.fertilizantes = fertilizantes
      );
    }

    delete(fertilizante: ProductoFertilizante): void {

      const swalWithBootstrapButtons = swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: '¿Estas seguro?',
        text: `¿Seguro que desea eliminar el producto Fertilizante ${fertilizante.nombreComercial}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, estoy seguro',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.fertilizanteService.deleteFertilizante(fertilizante.idFertilizante).subscribe(
            response => {
              this.fertilizantes = this.fertilizantes.filter(f => f !== fertilizante);
            }
          )
          swalWithBootstrapButtons.fire(
            'Fertilizante eliminado!',
            'El producto Fertilizante ha sido eliminado.',
            'success'
          )
        } else if (
          result.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'La eliminación del producto Fertilizante se canceló',
            'error'
          )
        }
      })
    }

    crear(): void {
      this.fertilizanteService.crearFertilizante(this.fertilizante).subscribe(
        fertilizante => {
          this.router.navigate(['/fertilizantes'])
          swal.fire('Nuevo producto Fertilizante', `El producto Fertilizante ${this.fertilizante.nombreComercial}, ha sido creado con éxito`, 'success');
          this.listaFertilizantesService();
        }
      )
    }

    update(): void {
      this.fertilizanteService.updateFertilizante(this.fertilizante).subscribe(
        fertilizante => {
          this.router.navigate(['/fertilizantes']);
          swal.fire('Producto Fertilizante actualizado', `Fertilizante ${this.fertilizante.nombreComercial}, ha sido actualizado con éxito`, 'success');
          this.listaFertilizantesService();
        }
      )
    }

    cargarFertilizante(id: number): void {
      this.activatedRoute.params.subscribe(params => {
        if (id) {
          this.fertilizanteService.getFertilizante(id).subscribe((fertilizante) => this.fertilizante = fertilizante);
        }
      })
    }

    vaciarInputs() {
      this.fertilizante = new ProductoFertilizante();
    }

}
