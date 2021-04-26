import { Component, OnInit } from '@angular/core';
import { EncargadoBPA } from './encargado-bpa';
import { EncargadoBPAService } from './encargado-bpa.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html'
})
export class FormularioComponent implements OnInit {

  encargado: EncargadoBPA = new EncargadoBPA();
  titulo: string = "Crear Encargado BPA";
  runFormateado: string;

  constructor(private encargadoService: EncargadoBPAService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarEncargado();
  }

  crear(): void {
    this.encargado.run = this.formatearRut(this.encargado.run);

    this.encargadoService.crearEncargado(this.encargado).subscribe(
      encargado => {
        this.router.navigate(['/encargadosBPA'])
        swal.fire('Nuevo Encargado BPA', `El Encargado BPA ${encargado.nombre}, ha sido creado con éxito`, 'success');
      }
    )
  }

  update():void{
    this.encargadoService.updateEncargado(this.encargado).subscribe(
      encargado => {
        this.router.navigate(['/encargadosBPA']);
        swal.fire('Encargado BPA actualizado', `Encargado BPA ${encargado.nombre}, ha sido actualizado con éxito`, 'success');
      }
    )
  }

  cargarEncargado():void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.encargadoService.getEncargado(id).subscribe((encargado) => this.encargado = encargado);
      }
    })
  }

  formatearRut(rut: string): string {
    let div1;
    let div2;
    let div3;
    let div4;

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
    return this.runFormateado;
  }
}
