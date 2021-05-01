import { Component, OnInit } from '@angular/core';
import { Campos } from './campos';
import { EncargadoBPA } from '../encargados-bpa/encargado-bpa';
import { CamposService } from './campos.service';
import { EncargadosBPAComponent } from '../encargados-bpa/encargados-bpa.component';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-campos',
  templateUrl: './campos.component.html',
  styleUrls: ['./campos.component.css']
})
export class CamposComponent implements OnInit {


  titulo: string = "Crear Campo";
  campo: Campos = new Campos();
  campos: Campos[];
  encargadosBPA: EncargadoBPA[];
  encargados2: EncargadosBPAComponent;
  nomEncar: string[];


  constructor(private campoService: CamposService,  private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.listaCamposService();
    // this.nombresEncargados();
    // console.log(this.nomEncar);
  }

  // nombresEncargados(): string[]{
  //   this.encargados2.listaEncargadosServiceParaCampo().forEach(element => {
  //     this.nomEncar.push(element.nombre);
  //   });
  //   return this.nomEncar;
  // }

  listaCamposService() {
    this.campoService.getCampos().subscribe(
      (campos) => this.campos = campos   //se agrega {this.encargadosBPA = encargados, otra cosa} al this cuando hay mas de una linea de codigo tambien al encargados cuando son mas de 1 parametro
    );
  }

  delete(campo: Campos): void {

    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: `¿Seguro que desea eliminar el Campo ${campo.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.campoService.deleteCampo(campo.idCampo).subscribe(
          response => {
            this.campos = this.campos.filter(fit => fit !== campo);
          }
        )
        swalWithBootstrapButtons.fire(
          'Campo eliminado!',
          'El Campo ha sido eliminado.',
          'success'
        )
      } else if (
        result.dismiss === swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'La eliminación del Campo se canceló',
          'error'
        )
      }
    })
  }

//metodo para crearFito junto con sweetAlert
  crear(): void {
    this.campoService.crearCampo(this.campo).subscribe(
      campo => {
        this.router.navigate(['/campos'])
        swal.fire('Nuevo Campo', `El campo ${campo.nombre}, ha sido creado con éxito`, 'success');
        this.listaCamposService();
      }
    )
  }

  //metodo para editar un fito junto con sweetAlert
  //si te fijas volvemos a llamar al metodo del servicio de la lista de fitos
  //para que se edita en tiempo real, asi se vuelve a llamar la lista pero ya actualizada
  update(): void {
    this.campoService.updateCampo(this.campo).subscribe(
      campo => {
        this.router.navigate(['/fitosanitarios']);
        swal.fire('Campo actualizado', `EL Campo ${campo.nombre}, ha sido actualizado con éxito`, 'success');
        this.listaCamposService();
      }
    )
  }

//metodo para cargar con datos los inputs del modal de editar fito
  cargarCampo(id: number): void {
    this.activatedRoute.params.subscribe(params => {
      //let id = params['run'];
      if (id) {
        this.campoService.getCampo(id).subscribe((campo) => {this.campo = campo});

      }
    })
  }


  vaciarInputs() {
    this.campo = new Campos();
  }

}
