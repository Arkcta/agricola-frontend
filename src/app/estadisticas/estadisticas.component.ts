import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { RegistroFitosanitarioService } from '../registro-fitosanitario/registro-fitosanitario.service';
import { RegistroFertilizanteService } from '../registro-fertilizante/registro-fertilizante.service';



@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {


  anioFiltrar: number;

  //meses para ferti
  arregloMesesFerti: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  //meses para fitos
  arregloMesesFito: number[] = [0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0];

  fecha: Date;
  mes: number;
  anio: number;

  constructor(private serviceRegistroFitosanitario: RegistroFitosanitarioService, private serviceRegistroFertilizante: RegistroFertilizanteService) { }

  ngOnInit(): void {
    this.serviceFito();
    this.serviceFerti();
  }

  consolePrueba() {
    console.log(this.anioFiltrar);
  }

  serviceFerti() {
    this.serviceRegistroFertilizante.getRegistrosFertilizantes().subscribe(
      (regiFerti) => {
        regiFerti.forEach(element => {
          let date = new Date(element.fecha);
          this.mes = date.getMonth() + 1;
          this.anio = date.getFullYear();
          //if (this.anio == this.anioFiltrar) {
            if (this.mes == 3) {
              this.arregloMesesFerti[2]++;
            }
          //}
        });
        this.graficoBarrasFertilizante();
      });
  }

  serviceFito() {
    this.serviceRegistroFitosanitario.getRegistrosFito().subscribe(
      (regiFito) => {
        regiFito.forEach(element => {
          let date = new Date(element.fecha);
          this.mes = date.getMonth() + 1;
          if (this.mes == 8) {
            this.arregloMesesFito[7]++;
          } else {
            if (this.mes == 9) {
              this.arregloMesesFito[8]++;
            } else {
              if (this.mes == 10) {
                this.arregloMesesFito[9]++;
              } else {
                if (this.mes == 11) {
                  this.arregloMesesFito[10]++;
                } else {
                  if (this.mes == 12) {
                    this.arregloMesesFito[11]++;
                  }
                }
              }
            }
          }
        });
        this.graficoBarraFitosanitarios();
      });
  }

  graficoBarrasFertilizante() {
    let myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [{
          label: 'N° de registros',
          data: this.arregloMesesFerti,
          backgroundColor: [
            'rgba(22, 160, 133, 0.7)',
            'rgba(241, 196, 15, 0.7)',
            'rgba(230, 50, 34, 0.7)',
            'rgba(40, 55, 71, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',

            'rgba(70, 195, 46, 0.7)',
            'rgba(15, 130, 300, 0.7)',
            'rgba(1, 23, 255, 0.7)',
            'rgba(122, 57, 43, 0.7)',
            'rgba(66, 10, 160, 0.7)',
            'rgba(1, 90, 163, 0.7)'
          ],
          borderColor: [
            'rgba(22, 160, 133, 1)',
            'rgba(241, 196, 15, 1)',
            'rgba(230, 50, 34, 1)',
            'rgba(40, 55, 71, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',

            'rgba(70, 195, 46, 1)',
            'rgba(15, 130, 300, 1)',
            'rgba(1, 23, 255, 1)',
            'rgba(122, 57, 43, 1)',
            'rgba(66, 10, 160, 1)',
            'rgba(1, 90, 163, 1)'
          ],
          borderWidth: 3
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  graficoBarraFitosanitarios() {
    let myChart2 = new Chart("myChart2", {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [{
          label: 'N° de registros',
          data: this.arregloMesesFito,
          backgroundColor: [
            'rgba(22, 160, 133, 0.7)',
            'rgba(241, 196, 15, 0.7)',
            'rgba(230, 50, 34, 0.7)',
            'rgba(40, 55, 71, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',

            'rgba(70, 195, 46, 0.7)',
            'rgba(15, 130, 300, 0.7)',
            'rgba(1, 23, 255, 0.7)',
            'rgba(122, 57, 43, 0.7)',
            'rgba(66, 10, 160, 0.7)',
            'rgba(1, 90, 163, 0.7)'
          ],
          borderColor: [
            'rgba(22, 160, 133, 1)',
            'rgba(241, 196, 15, 1)',
            'rgba(230, 50, 34, 1)',
            'rgba(40, 55, 71, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',

            'rgba(70, 195, 46, 1)',
            'rgba(15, 130, 300, 1)',
            'rgba(1, 23, 255, 1)',
            'rgba(122, 57, 43, 1)',
            'rgba(66, 10, 160, 1)',
            'rgba(1, 90, 163, 1)'
          ],
          borderWidth: 3
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  graficoPrueba() {
    let myChart3 = new Chart("myChart3", {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [{
          label: 'Registros Fitosanitarios',
          data: [12, 19, 3, 5, 2, 3],
        },
        {
          label: 'Registros Fertilizantes',
          data: [12, 19, 3, 5, 2, 3],
        }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }


}
