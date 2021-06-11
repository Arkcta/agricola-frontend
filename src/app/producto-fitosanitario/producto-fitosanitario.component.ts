import { Component, OnInit } from '@angular/core';
import { ProductoFitosanitario } from './producto-fitosanitario';
import { ProductoFitosanitarioService } from './producto-fitosanitario.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-producto-fitosanitario',
  templateUrl: './producto-fitosanitario.component.html',
  styleUrls: ['./producto-fitosanitario.component.css']
})
export class ProductoFitosanitarioComponent implements OnInit {

  fitosanitario: ProductoFitosanitario = new ProductoFitosanitario();
  fitosanitarios: ProductoFitosanitario[];
  flag:boolean = true;
  pageActual: number = 1;

  constructor(private fitosanitarioService: ProductoFitosanitarioService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.listaFitosanitariosService();
  }

  //este metodo lo que hace es traer la lista de fitosanitarios
  listaFitosanitariosService() {
    this.fitosanitarioService.getFitosanitarios().subscribe(
      (fitos) => this.fitosanitarios = fitos  //se agrega {this.encargadosBPA = encargados} al this cuando hay mas de una linea de codigo tambien al encargados cuando son mas de 1 parametro
    );
  }

  //metodo para eliminar un fito con los respectivos sweetAlert
  //la logica de los sweetAlert no es compleja como se ve es bastante intuitiva
  delete(fito: ProductoFitosanitario): void {

    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: `¿Seguro que desea eliminar el producto Fitosanitario ${fito.nombreComercial}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.fitosanitarioService.deleteFitosanitario(fito.idFitosanitario).subscribe(
          response => {
            this.fitosanitarios = this.fitosanitarios.filter(fit => fit !== fito);
          }
        )
        swalWithBootstrapButtons.fire(
          '¡Fitosanitario eliminado!',
          'El producto Fitosanitario ha sido eliminado éxitosamente.',
          'success'
        )
      } else if (
        result.dismiss === swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'La eliminación del producto Fitosanitario se canceló',
          'error'
        )
      }
    })
  }

//metodo para crearFito junto con sweetAlert
  crear(): void {
    this.fitosanitarioService.crearFitosanitario(this.fitosanitario).subscribe(
      json => {
        this.router.navigate(['/fitosanitarios'])
        swal.fire('Nuevo producto Fitosanitario', `El producto Fitosanitario ${json.fito.nombreComercial} ha sido creado con éxito`, 'success');
        this.listaFitosanitariosService();
      }
    )
  }

  //metodo para editar un fito junto con sweetAlert
  //si te fijas volvemos a llamar al metodo del servicio de la lista de fitos
  //para que se edita en tiempo real, asi se vuelve a llamar la lista pero ya actualizada
  update(): void {
    this.fitosanitarioService.updateEncargado(this.fitosanitario).subscribe(
      json => {
        this.router.navigate(['/fitosanitarios']);
        swal.fire('Producto Fitosanitario actualizado', `Fitosanitario ${json.fitosanitario.nombreComercial}, ha sido actualizado con éxito`, 'success');
        this.listaFitosanitariosService();
      }
    )
  }

//metodo para cargar con datos los inputs del modal de editar fito
  cargarFitosanitario(id: number): void {
    this.activatedRoute.params.subscribe(params => {
      //let id = params['run'];
      if (id) {
        this.fitosanitarioService.getFitosanitario(id).subscribe((fito) => this.fitosanitario = fito);
      }
    })
  }

//metodo que vacia los inputs del modal agregar fito
  vaciarInputs() {
    this.fitosanitario = new ProductoFitosanitario();
    let select = <HTMLInputElement>document.getElementById("select");
    select.value="";
  }

  enviarId(value:string){

    if(value != ""){
      this.fitosanitario.tipo = value;
      this.flag = false;
    }else{
      this.flag =true;
    }
  }
}
