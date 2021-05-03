import { Component, OnInit } from '@angular/core';
import { ListarEncargadosBpa } from './listar-encargados-bpa';
import { ListarEncargadosBpaService } from './listar-encargados-bpa.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listar-encargados-bpa',
  templateUrl: './listar-encargados-bpa.component.html',
  styleUrls: ['./listar-encargados-bpa.component.css']
})

export class ListarEncargadosBpaComponent implements OnInit {

  encargado: ListarEncargadosBpa = new ListarEncargadosBpa();
  encargadosBPA: ListarEncargadosBpa[];
  constructor(private encargadoBPAService: ListarEncargadosBpaService, private router: Router, private activatedRoute: ActivatedRoute) { }

 ngOnInit(): void {
   this.listaEncargadosService();
 }

 listaEncargadosService() {
   this.encargadoBPAService.getEncargados().subscribe(
     (encargados) => this.encargadosBPA = encargados  //se agrega {this.encargadosBPA = encargados, otra cosa} al this cuando hay mas de una linea de codigo tambien al encargados cuando son mas de 1 parametro
   );
 }
}
