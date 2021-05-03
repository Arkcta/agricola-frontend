import { Component, OnInit } from '@angular/core';
import { ListarRegistrosFitosanitarios } from './listar-registros-fitosanitarios';
import { ListarRegistrosFitosanitariosService } from './listar-registros-fitosanitarios.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-listar-registros-fitosanitarios',
  templateUrl: './listar-registros-fitosanitarios.component.html',
  styleUrls: ['./listar-registros-fitosanitarios.component.css']
})
export class ListarRegistrosFitosanitariosComponent implements OnInit {

    registrosFitosanitarios: ListarRegistrosFitosanitarios[];
    registroFitosanitario: ListarRegistrosFitosanitarios = new ListarRegistrosFitosanitarios();

    constructor(private regisFitoService: ListarRegistrosFitosanitariosService, private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
      this.listaRegistroFitoService();
    }

    listaRegistroFitoService() {
      this.regisFitoService.getRegistrosFito().subscribe(
        (regiFito) => {this.registrosFitosanitarios = regiFito}  //se agrega {this.encargadosBPA = encargados, otra cosa} al this cuando hay mas de una linea de codigo tambien al encargados cuando son mas de 1 parametro
      );
    }

}
