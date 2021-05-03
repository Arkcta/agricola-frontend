import { Component, OnInit } from '@angular/core';
import { Cuartel} from './cuartel';
import { CuartelService } from './cuartel.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-cuartel',
  templateUrl: './cuartel.component.html',
  styleUrls: ['./cuartel.component.css']
})
export class CuartelComponent implements OnInit {

  cuartel:Cuartel = new Cuartel();
  cuarteles: Cuartel[];

constructor(private cuartelService: CuartelService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.listaCuartelesService();
  }

  listaCuartelesService() {
     this.cuartelService.getCuarteles().subscribe(
       (cuarteles) => this.cuarteles = cuarteles
       );
   }

   delete(cuartel: Cuartel): void {
     const swalWithBootstrapButtons = swal.mixin({
       customClass: {
         confirmButton: 'btn btn-success',
         cancelButton: 'btn btn-danger'
       },
       buttonsStyling: false
     })

     swalWithBootstrapButtons.fire({
       title: '¿Estas seguro?',
       text: `¿Seguro que desea eliminar el Cuartel ${cuartel.nombre}?`,
       icon: 'warning',
       showCancelButton: true,
       confirmButtonText: 'Si, estoy seguro',
       cancelButtonText: 'No, cancelar',
       reverseButtons: true
     }).then((result) => {
       if (result.isConfirmed) {
         this.cuartelService.deleteCuartel(cuartel.idCuartel).subscribe(
           response => {
             this.cuarteles = this.cuarteles.filter(cua => cua !== cuartel);
           }
         )
         swalWithBootstrapButtons.fire(
           'Cuartel eliminado!',
           'El Cuartel ha sido eliminado.',
           'success'
         )
       } else if (
         result.dismiss === swal.DismissReason.cancel
       ) {
         swalWithBootstrapButtons.fire(
           'Cancelado',
           'La eliminación del Cuartel se canceló',
           'error'
         )
       }
     })
   }

   crear(): void {
     this.cuartelService.crearCuartel(this.cuartel).subscribe(
       cuartel => {
         this.router.navigate(['/cuarteles'])
         swal.fire('Nuevo Cuartel', `El Cuartel ${cuartel.nombre}, ha sido creado con éxito`, 'success');
         this.listaCuartelesService();
       }
     )
   }

   update(): void {
     this.cuartelService.updateCuartel(this.cuartel).subscribe(
      cuartel => {
         this.router.navigate(['/cuarteles']);
         swal.fire('Cuartel actualizado', `El Cuartel ${cuartel.nombre}, ha sido actualizado con éxito`, 'success');
         this.cuartelService.getCuarteles().subscribe(
           (cuarteles) => this.cuarteles = cuarteles
           );
       }
     )
   }

   cargarCuartel(id: number): void {
     this.activatedRoute.params.subscribe(params => {
       //let id = params['id'];
       if (id) {
         this.cuartelService.getCuartel(id).subscribe((cuartel) => this.cuartel = cuartel);
       }
     })
   }

   //metodo que vacia el form para crear
   vaciarInputs() {
     this.cuartel = new Cuartel();
   }

}
