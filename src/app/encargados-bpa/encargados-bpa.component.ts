import { Component, OnInit } from '@angular/core';
import { EncargadoBPA } from './encargado-bpa';
import { EncargadoBPAService } from './encargado-bpa.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-encargados-bpa',
  templateUrl: './encargados-bpa.component.html',
  styleUrls: ['./encargados-bpa.component.css']
})
export class EncargadosBPAComponent implements OnInit {

  titulo: string = "Crear Encargado BPA";
  encargado: EncargadoBPA = new EncargadoBPA();
  encargadosBPA: EncargadoBPA[];

  // variable para bloquear boton de agregar o editar aun no implementado
  agregarEn = false;

  //variables para validar rut que aun no se implementa
  runFormateado: string;
  valor: string;
  valorNumber: number;
  nFinal: number;



  constructor(private encargadoBPAService: EncargadoBPAService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.listaEncargadosService();
  }

  listaEncargadosService() {
    this.encargadoBPAService.getEncargados().subscribe(
      (encargados) => this.encargadosBPA = encargados  //se agrega {this.encargadosBPA = encargados, otra cosa} al this cuando hay mas de una linea de codigo tambien al encargados cuando son mas de 1 parametro
    );
  }

  // listaEncargadosServiceParaCampo(): EncargadoBPA[]{
  //
  //   this.encargadoBPAService.getEncargados().subscribe(
  //     (encargados) => this.encargadosBPA = encargados  //se agrega {this.encargadosBPA = encargados, otra cosa} al this cuando hay mas de una linea de codigo tambien al encargados cuando son mas de 1 parametro
  //   );
  //   return this.encargadosBPA;
  // }

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
        this.encargadoBPAService.deleteEncargado(encargado.run).subscribe(
          response => {
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

  crear(): void {


    this.encargadoBPAService.crearEncargado(this.encargado).subscribe(
      encargado => {
        this.router.navigate(['/encargadosBPA'])
        swal.fire('Nuevo Encargado BPA', `El Encargado BPA ${encargado.nombre}, ha sido creado con éxito`, 'success');
        this.listaEncargadosService();
      }
    )
  }

  update(): void {
    this.encargadoBPAService.updateEncargado(this.encargado).subscribe(
      encargado => {
        this.router.navigate(['/encargadosBPA']);
        swal.fire('Encargado BPA actualizado', `Encargado BPA ${encargado.nombre}, ha sido actualizado con éxito`, 'success');
        this.encargadoBPAService.getEncargados().subscribe(
          (encargados) => this.encargadosBPA = encargados//se agrega {this.encargadosBPA = encargados} al this cuando hay mas de una linea de codigo tambien al encargados cuando son mas de 1 parametro
        );

      }
    )

  }

  cargarEncargado(run: string): void {
    this.activatedRoute.params.subscribe(params => {
      //let id = params['run'];
      if (run) {
        this.encargadoBPAService.getEncargado(run).subscribe((encargado) => this.encargado = encargado);
      }
    })
  }


  //este metodo formatea el rut y tambien lo valida con el check pero aun no esta operativo
  formatearRut(rut: string) {
    console.log("ENTREEE AL ONLICKKKK")

    let div1;
    let div2;
    let div3;
    let div4;

    if (rut == "") {
      this.agregarEn = false;
    } else {
      if (rut.length >= 8) {
        if (rut.length == 9) {
          div1 = rut.slice(0, 2);
          div2 = rut.slice(2, 5);
          div3 = rut.slice(5, 8);
          div4 = rut.slice(8, 9);
          this.runFormateado = (div1 + "." + div2 + "." + div3 + "-" + div4);
        }
        if (rut.length == 8) {
          div1 = rut.slice(0, 1);
          div2 = rut.slice(1, 4);
          div3 = rut.slice(4, 7);
          div4 = rut.slice(7, 8);
          this.runFormateado = (div1 + "." + div2 + "." + div3 + "-" + div4);
        }


        if (!this.checkRut(this.runFormateado)) {
          this.agregarEn = true;
        } else {
          this.agregarEn = false;
        };
      } else {
        if (!this.checkRut(rut)) {
          this.agregarEn = true;
        } else {
          this.agregarEn = false;
        };
      }
    }
    console.log(this.agregarEn);

  }

  //metodo que valida el ru
  vaciarInputs() {
    this.encargado = new EncargadoBPA();
  }

  //metodo que valida el rut
  checkRut(rut: string): boolean {

    if (rut.includes('.')) {
      // Despejar Puntos
      this.valor = rut.replace('.', '');
      // Despejar Guión
      this.valor = this.valor.replace('-', '');

      // Aislar Cuerpo y Dígito Verificador
      let cuerpo = this.valor.slice(0, -1);
      let dv = this.valor.slice(-1).toUpperCase();

      // Formatear RUN
      rut = cuerpo + '-' + dv

      // Si no cumple con el mínimo ej. (n.nnn.nnn)
      if (cuerpo.length < 7) { return false; }

      // Calcular Dígito Verificador
      let suma = 0;
      let multiplo = 2;

      this.valorNumber = parseInt(this.valor)

      // Para cada dígito del Cuerpo
      for (let i = 1; i <= cuerpo.length; i++) {
        this.valorNumber = parseInt(this.valor.charAt(cuerpo.length - i))
        // Obtener su Producto con el Múltiplo Correspondiente
        let index = multiplo * this.valorNumber;

        // Sumar al Contador General
        suma = suma + index;

        // Consolidar Múltiplo dentro del rango [2,7]
        if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }

      }

      // Calcular Dígito Verificador en base al Módulo 11
      let dvEsperado = 11 - (suma % 11);

      // Casos Especiales (0 y K)
      if (dv == 'K') { this.nFinal = 10 }
      if (dv == '0') { this.nFinal = 11 }
      // Validar que el Cuerpo coincide con su Dígito Verificador
      if (dvEsperado != this.nFinal) { return false }

      // Si todo sale bien, eliminar errores (decretar que es válido)
      return true;
    } else {

      // Aislar Cuerpo y Dígito Verificador
      let cuerpo = rut.slice(0, -1);
      let dv = rut.slice(-1).toUpperCase();

      // Formatear RUN
      rut = cuerpo + '-' + dv

      // Si no cumple con el mínimo ej. (n.nnn.nnn)
      if (cuerpo.length < 7) { return false; }

      // Calcular Dígito Verificador
      let suma = 0;
      let multiplo = 2;

      this.valorNumber = parseInt(rut)

      // Para cada dígito del Cuerpo
      for (let i = 1; i <= cuerpo.length; i++) {
        this.valorNumber = parseInt(rut.charAt(cuerpo.length - i))
        // Obtener su Producto con el Múltiplo Correspondiente
        let index = multiplo * this.valorNumber;

        // Sumar al Contador General
        suma = suma + index;

        // Consolidar Múltiplo dentro del rango [2,7]
        if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }

      }

      // Calcular Dígito Verificador en base al Módulo 11
      let dvEsperado = 11 - (suma % 11);

      // Casos Especiales (0 y K)
      if (dv == 'K') { this.nFinal = 10 }
      if (dv == '0') { this.nFinal = 11 }
      // Validar que el Cuerpo coincide con su Dígito Verificador
      if (dvEsperado != this.nFinal) { return false }

      // Si todo sale bien, eliminar errores (decretar que es válido)
      return true;

    }
  }
}
