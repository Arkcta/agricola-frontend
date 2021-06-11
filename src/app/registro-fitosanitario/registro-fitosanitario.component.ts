import { Component, OnInit } from '@angular/core';
import { RegistroFitosanitario } from './registro-fitosanitario';
import { RegistroFitosanitarioService } from './registro-fitosanitario.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { formatDate } from '@angular/common';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { AuthService } from '../usuarios/auth.service';
import { EncargadoBPAService } from '../encargados-bpa/encargado-bpa.service';
import { EncargadoBPA } from '../encargados-bpa/encargado-bpa';
import { ProductoFitosanitarioService } from '../producto-fitosanitario/producto-fitosanitario.service';
import { ProductoFitosanitario } from '../producto-fitosanitario/producto-fitosanitario';
import { CuartelService } from '../cuartel/cuartel.service';
import { Cuartel } from '../cuartel/cuartel';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-registro-fitosanitario',
  templateUrl: './registro-fitosanitario.component.html',
  styleUrls: ['./registro-fitosanitario.component.css'],
})
export class RegistroFitosanitarioComponent implements OnInit {
  registrosFitosanitarios: RegistroFitosanitario[];
  registroFitosanitario: RegistroFitosanitario = new RegistroFitosanitario();
  pageActual: number = 1;
  encargadosSelect: Observable<EncargadoBPA[]> = this.encargadoService.getEncargados();
  arraysEncargados: Array<EncargadoBPA> = [];
  fitoSelect: Observable<ProductoFitosanitario[]> = this.fitoService.getFitosanitarios();
  arraysFitos: Array<ProductoFitosanitario> = [];
  cuartelSelect: Observable<Cuartel[]> = this.cuartelService.getCuarteles();
  arraysCuarteles: Array<Cuartel> = [];

  flag: boolean = true;
  flag2: boolean = true;
  flag3: boolean = true;

  //variables para exportar excel
  tipoMaqui: any;
  estadoFeno: any;
  dosis: any;
  fecha: any;
  horaTermino: any;
  condiciones: any;
  encargadoBPA: any;
  fitosanitario: any;
  cuartel: any;

  //variables para rescatar fecha actual
  now = new Date();
  anioNowString: string;
  mesNowString: string;
  dayNowString: string;
  fechaNow: string;


  constructor(
    private regisFitoService: RegistroFitosanitarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private encargadoService: EncargadoBPAService,
    private fitoService: ProductoFitosanitarioService,
    private cuartelService: CuartelService
  ) {}

  ngOnInit(): void {
    this.listaRegistroFitoService();
    this.anioNowString = formatDate(this.now, 'yyyy', 'en-US', '+0530');
    this.mesNowString = formatDate(this.now, 'MM', 'en-US', '+0530');
    this.dayNowString = formatDate(this.now, 'dd', 'en-US', '+0530');
    this.fechaNow = Number(this.dayNowString) + '/' + this.mesNowString + '/' + this.anioNowString;
    this.encargadosSelect.subscribe(encargados => {
      encargados.forEach(encar =>{
        this.arraysEncargados.push(encar);
      })
    });
    this.cargarFitos();
    this.cargarCuarteles();
  }

  cargarFitos(){
    this.fitoSelect.subscribe(fitos => {
      fitos.forEach(fit =>{
        this.arraysFitos.push(fit);
      })
    });
  }

  cargarCuarteles(){
    this.cuartelSelect.subscribe(cuarteles => {
      cuarteles.forEach(cuartel =>{
        this.arraysCuarteles.push(cuartel);
      })
    });
  }

  listaRegistroFitoService() {
    this.regisFitoService.getRegistrosFito().subscribe(
      (regiFito) => {
        this.registrosFitosanitarios = regiFito;
      } //se agrega {this.encargadosBPA = encargados, otra cosa} al this cuando hay mas de una linea de codigo tambien al encargados cuando son mas de 1 parametro
    );
  }

  delete(regiFito: RegistroFitosanitario): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: '¿Estas seguro?',
        text: '¿Seguro que desea eliminar el Registro Fitosanitario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, estoy seguro',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.regisFitoService
            .deleteRegistroFito(regiFito.idRegistroFitosanitario)
            .subscribe((response) => {
              this.registrosFitosanitarios =
                this.registrosFitosanitarios.filter(
                  (reFito) => reFito !== regiFito
                );
            });
          swalWithBootstrapButtons.fire(
            '¡Registro Fitosanitario eliminado!',
            'El Registro Fitosanitario ha sido eliminado con éxito.',
            'success'
          );
        } else if (result.dismiss === swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'La eliminación del Registro Fitosanitario se canceló',
            'error'
          );
        }
      });
  }

  crear(): void {
    this.regisFitoService
      .crearRegistroFito(this.registroFitosanitario)
      .subscribe((json) => {
        this.router.navigate(['/registrosFitosanitarios']);
        swal.fire(
          'Nuevo Registro Fitosanitario',
          `El registro fitosanitario ha sido creado con éxito`,
          'success'
        );
        this.listaRegistroFitoService();
      });
  }

  update(): void {
    this.regisFitoService
      .updateRegistroFito(this.registroFitosanitario)
      .subscribe((json) => {
        this.router.navigate(['/registrosFitosanitarios']);
        swal.fire(
          'Registro Fitosanitario actualizado',
          'El registro fitosanitario ha sido actualizado con éxito',
          'success'
        );
        this.listaRegistroFitoService();
      });
  }

  cargarRegistroFito(id: number): void {
    this.activatedRoute.params.subscribe((params) => {
      //let id = params['run'];
      if (id) {
        this.regisFitoService
          .getRegistroFito(id)
          .subscribe((reg) => (this.registroFitosanitario = reg));
      }
    });
  }

  vaciarInputs() {
    this.registroFitosanitario = new RegistroFitosanitario();

    let select = <HTMLInputElement>document.getElementById("select");
    let select2 = <HTMLInputElement>document.getElementById("select2");
    let select3 = <HTMLInputElement>document.getElementById("select3");
    select.value="";
    select2.value="";
    select3.value="";
  }

  dowloadPDF() {
    var docDefinition = {
      pageOrientation: 'landscape',
      content: [
        {
          text: 'Registros Fitosanitarios',
          style: 'header',
          alignment: 'center',
          fontSize: 20,
        },
        {
          text: 'Fecha: ' + this.fechaNow + '\n\n',
          alignment: 'left',
          fontSize: 12,
        },
        this.table(this.registrosFitosanitarios, [
          { text: 'Tipo maquinaria', bold: true, fillColor: '#D68910' },
          { text: 'Estado fenologico', bold: true, fillColor: '#D68910' },
          { text: 'Dosis', bold: true, fillColor: '#D68910' },
          { text: 'Fecha', bold: true, fillColor: '#D68910' },
          { text: 'Hora termino', bold: true, fillColor: '#D68910' },
          {
            text: 'Condiciones metereologicas',
            bold: true,
            fillColor: '#D68910',
          },
          { text: 'Run Encargado BPA', bold: true, fillColor: '#D68910' },
          { text: 'Nombre Fitosanitario', bold: true, fillColor: '#D68910' },
          { text: 'Nombre Cuartel', bold: true, fillColor: '#D68910' },
        ]),
      ],
    };
    pdfMake.createPdf(docDefinition).open();
  } //end docDefinition

  table(data: RegistroFitosanitario[], columns) {
    return {
      border: [false, false, false, false, false, false, false, false, false],
      style: 'tableExample',
      table: {
        widths: [
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
        ],
        headerRows: 1,
        heights: [30, 30, 30, 30, 30, 30, 30, 30, 30],
        body: this.buildTableBody(data, columns),
      },
      layout: 'lightHorizontalLines',
      alignment: 'center',
    };
  }

  buildTableBody(data: RegistroFitosanitario[], columns): any[] {
    const body = [];

    body.push(columns);

    data.forEach((row) => {
      var dataRow = [];
      dataRow.push(
        { text: row.tipoMaquinaria, alignment: 'center' },
        { text: row.estadoFenologico, alignment: 'center' },
        { text: row.dosis, alignment: 'center' },
        { text: row.fecha, alignment: 'center' },
        { text: row.horaTermino, alignment: 'center' },
        { text: row.condicionesMetereologicas, alignment: 'center' },
        { text: row.idEncargadoBPA, alignment: 'center' },
        { text: row.idFitosanitario, alignment: 'center' },
        { text: row.idCuartel, alignment: 'center' }
      );

      body.push(dataRow);
    });

    return body;
  }

  dowloadExcel() {
    let workbook = new Workbook();

    let worksheet = workbook.addWorksheet('Registros Fitosanitarios');
    worksheet.addRow([]);
    let titleRow = worksheet.addRow(['REGISTRO DE APLICACIÓN DE PRODUCTOS FITOSANITARIOS']);
    worksheet.addRow([]);
    worksheet.addRow([]);

    worksheet.mergeCells('A2:I2');

    // Set font, size and style in title row.
    titleRow.font = { name: 'Calibri', family: 4, size: 16, underline: 'double', bold: true };

    titleRow.eachCell((cell, number) => {
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };
    });

    let header = [
      'Tipo maquinaria',
      'Estado fenologico',
      'Dosis (L)',
      'Fecha',
      'Hora termino',
      'Condiciones metereologicas',
      'Run Encargado BPA',
      'Nombre Fitosanitario',
      'Nombre Cuartel',
    ];

    let headerRow = worksheet.addRow(header);

    headerRow.eachCell((cell, number) => {
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };
      
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'D68910' },
        bgColor: { argb: 'D68910' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    for (let x1 of this.registrosFitosanitarios) {
      let temp = [];

      this.tipoMaqui = x1.tipoMaquinaria;
      this.estadoFeno = x1.estadoFenologico;
      this.dosis = x1.dosis;
      this.fecha = x1.fecha;
      this.horaTermino = x1.horaTermino;
      this.condiciones = x1.condicionesMetereologicas;
      this.encargadoBPA = x1.idEncargadoBPA;
      this.fitosanitario = x1.idFitosanitario;
      this.cuartel = x1.idCuartel;
      temp.push(
        this.tipoMaqui,
        this.estadoFeno,
        this.dosis,
        this.fecha,
        this.horaTermino,
        this.condiciones,
        this.encargadoBPA,
        this.fitosanitario,
        this.cuartel
      );
      
      let style = worksheet.addRow(temp);

      style.eachCell((cell, number) => {
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
          
        };
        
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
          
        };
      });
      for(let i=0; i< worksheet.columns.length ;i++){
        if(i == 0) worksheet.columns[i].width = 20; //TIPO
        if(i == 1) worksheet.columns[i].width = 25;//estado
        if(i == 2) worksheet.columns[i].width = 10;//dosis
        if(i == 3) worksheet.columns[i].width = 14;//fecha
        if(i == 4) worksheet.columns[i].width = 14;//horatermino
        if(i == 5) worksheet.columns[i].width = 28;//condiciones
        if(i == 6) worksheet.columns[i].width = 20;//encargadoBPA
        if(i == 7) worksheet.columns[i].width = 20;//Fitosanitario
        if(i == 8) worksheet.columns[i].width = 15;//cuartel
      } 
    }

    let fname = 'Registros Fitosanitarios';

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, fname + ' ' + this.fechaNow);
    });
  }

  enviarId(value:string){

    if(value != ""){
      this.registroFitosanitario.idEncargadoBPA = value;
      this.flag = false;
    }else{
      this.flag =true;
    }
  }

  enviarId2(value:string){

    if(value != ""){
      this.registroFitosanitario.idFitosanitario = Number(value);
      this.flag2 = false;
    }else{
      this.flag2 =true;
    }
  }

  enviarId3(value:string){

    if(value != ""){
      this.registroFitosanitario.idCuartel = Number(value);
      this.flag3 = false;
    }else{
      this.flag3 =true;
    }
  }
}
