import { Component, OnInit } from '@angular/core';
import { ListarRegistrosFertilizantes } from './listar-registros-fertilizantes';
import { ListarRegistrosFertilizantesService } from './listar-registros-fertilizantes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listar-registros-fertilizantes',
  templateUrl: './listar-registros-fertilizantes.component.html',
  styleUrls: ['./listar-registros-fertilizantes.component.css']
})
export class ListarRegistrosFertilizantesComponent implements OnInit {

  registro:ListarRegistrosFertilizantes = new ListarRegistrosFertilizantes ();
  registros:ListarRegistrosFertilizantes[];

constructor(private registroService: ListarRegistrosFertilizantesService, private router: Router, private activatedRoute: ActivatedRoute) { }

ngOnInit(): void {
  this.listaRegistrosService();
}

listaRegistrosService() {
   this.registroService.getRegistrosFertilizantes().subscribe(
     (registros) => this.registros = registros
     );
 }
 vaciarInputs() {
   this.registro= new ListarRegistrosFertilizantes();
 }
}
