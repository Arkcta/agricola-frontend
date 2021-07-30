import { Component, OnInit } from '@angular/core';
import { CuartelService } from '../cuartel/cuartel.service';
import { Cuartel } from '../cuartel/cuartel';
import { PredioService } from '../predio/predio.service';
import { Predio } from '../predio/predio';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cuartelSelect: Observable<Cuartel[]> = this.cuartelService.getCuarteles();
  arraysCuarteles: Array<Cuartel> = [];

  constructor(private cuartelService: CuartelService, private predioService: PredioService) { }

  ngOnInit(): void {
    console.log(this.arraysCuarteles);
  }


  cargarCuarteles(){
    this.cuartelSelect.subscribe(cuarteles => {
      cuarteles.forEach(cuartel =>{
        this.arraysCuarteles.push(cuartel);
      })
    });
  }

}
