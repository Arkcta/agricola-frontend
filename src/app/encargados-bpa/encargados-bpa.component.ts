import { Component, OnInit } from '@angular/core';
import { EncargadoBPA } from './encargado-bpa';
import { EncargadoBPAService } from './encargado-bpa.service';

@Component({
  selector: 'app-encargados-bpa',
  templateUrl: './encargados-bpa.component.html',
  styleUrls: ['./encargados-bpa.component.css']
})
export class EncargadosBPAComponent implements OnInit {

  encargadosBPA: EncargadoBPA[];
  constructor(private encargadpBPAService: EncargadoBPAService) { }

  ngOnInit(): void {
    this.encargadpBPAService.getClientes().subscribe(
      (encargados) => this.encargadosBPA = encargados  //se agregar {this.encargadosBPA = encargados} al this cuando hay mas de una linea de codigo tambien al encargados cuando son mas de 1 parametro
    );
  }

}
