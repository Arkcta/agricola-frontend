import { Component, OnInit } from '@angular/core';
import { Campos } from './campos';
import { EncargadoBPA } from '../encargados-bpa/encargado-bpa';
import { CamposService } from './campos.service';
import { EncargadosBPAComponent } from '../encargados-bpa/encargados-bpa.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AdministradorService } from '../administrador/administrador.service';
import swal from 'sweetalert2';
import { Observable } from 'rxjs/internal/Observable';
import { Administrador } from '../administrador/administrador';

@Component({
  selector: 'app-campos',
  templateUrl: './campos.component.html',
  styleUrls: ['./campos.component.css']
})
export class CamposComponent implements OnInit {

  titulo: string = "Crear Campo";
  campo: Campos = new Campos();
  campos: Campos[];
  pageActual: number = 1;
  encargadosBPA: EncargadoBPA[];
  campoEditar: Campos =  new Campos();
  encargados2: EncargadosBPAComponent;
  adminSelect: Observable<Administrador[]> = this.adminService.getAdministradores();
  arraysAdmin: Array<Administrador> = [];
  flag:boolean = true;


  constructor(private campoService: CamposService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adminService: AdministradorService) { }

  ngOnInit(): void {
    this.listaCamposService();
    this.cargarAdmins();
  }

  cargarAdmins(){
    this.adminSelect.subscribe(admins => {
      admins.forEach(ad =>{
        this.arraysAdmin.push(ad);
      })
    });
  }


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
          '¡Campo eliminado!',
          `El campo ${campo.nombre} ha sido eliminado.`,
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
      json => {
        this.router.navigate(['/campos'])
        swal.fire('Nuevo Campo', `El campo ${json.campo.nombre} ha sido creado con éxito`, 'success');
        this.listaCamposService();
      }
    )
  }

  update(): void {
    this.campoService.updateCampo(this.campo).subscribe(
      json => {
        this.router.navigate(['/campos']);
        swal.fire('¡Campo actualizado!', `El campo ${this.campo.nombre} ha sido actualizado con éxito`, 'success');
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
    let select = <HTMLInputElement>document.getElementById("select");
    select.value="";
  }

  enviarId(value:string){

    if(value != ""){
      this.campo.runAdministradorCampo =  value;
      this.flag = false;
    }else{
      this.flag =true;
    }
  }

}
