import { Component, OnInit } from '@angular/core';
import { RegistroFertilizante } from './registro-fertilizante';
import { RegistroFertilizanteService } from './registro-fertilizante.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { formatDate } from '@angular/common';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-registro-fertilizante',
  templateUrl: './registro-fertilizante.component.html',
  styleUrls: ['./registro-fertilizante.component.css'],
})
export class RegistroFertilizanteComponent implements OnInit {


  // variable para hacer el filtrado
  filterRegistro='';
  

  registro: RegistroFertilizante = new RegistroFertilizante();
  registros: RegistroFertilizante[];

  //variables para descarga de excel
  fecha: any;
  metodoApli: any;
  estadoFeno: any;
  cantodadApli: any;
  tipoMaqui: any;
  encargadoBPA: any;
  fertilizante: any;
  cuartel: any;



  //variables para rescatar fecha actual
  now = new Date();
  anioNowString: string;
  mesNowString: string;
  dayNowString: string;
  fechaNow: string;

constructor(private registroService: RegistroFertilizanteService,
  private router: Router, private activatedRoute: ActivatedRoute , public authService: AuthService) { }

  ngOnInit(): void {
    this.listaRegistrosService();
    this.anioNowString = formatDate(this.now, 'yyyy', 'en-US', '+0530');
    this.mesNowString = formatDate(this.now, 'MM', 'en-US', '+0530');
    this.dayNowString = formatDate(this.now, 'dd', 'en-US', '+0530');
    this.fechaNow = this.dayNowString+"/"+this.mesNowString+"/"+this.anioNowString;
  }

  listaRegistrosService() {
    this.registroService
      .getRegistrosFertilizantes()
      .subscribe((registros) => (this.registros = registros));
  }

  delete(registro: RegistroFertilizante): void {
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
        text: `¿Seguro que desea eliminar el Registro Fertilizante?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, estoy seguro',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.registroService
            .deleteRegistroFertilizantes(registro.idRegistro)
            .subscribe((response) => {
              this.registros = this.registros.filter((r) => r !== registro);
            });
          swalWithBootstrapButtons.fire(
            'Registro Fertilizante eliminado!',
            'El registro ha sido eliminado.',
            'success'
          );
        } else if (result.dismiss === swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'La eliminación del registro se canceló',
            'error'
          );
        }
      });
  }

  crear(): void {
    this.registroService
      .crearRegistroFertilizantes(this.registro)
      .subscribe((registro) => {
        this.router.navigate(['/registrosFertilizantes']);
        swal.fire(
          'Nuevo Registro Fertilizante',
          `El Registro Fitosanitario, ha sido creado con éxito`,
          'success'
        );
        this.listaRegistrosService();
      });
  }

  update(): void {
    this.registroService
      .updateRegistroFertilizantes(this.registro)
      .subscribe((registro) => {
        this.router.navigate(['/registrosFertilizantes']);
        swal.fire(
          'Registro Fertilizante actualizado',
          `El Registro Fertilizante, ha sido actualizado con éxito`,
          'success'
        );
        this.registroService
          .getRegistrosFertilizantes()
          .subscribe((registros) => (this.registros = registros));
      });
  }

  cargarRegistroFertilizante(id: number): void {
    this.activatedRoute.params.subscribe((params) => {
      if (id) {
        this.registroService
          .getRegistroFertilizante(id)
          .subscribe((registro) => (this.registro = registro));
      }
    });
  }

  vaciarInputs() {
    this.registro = new RegistroFertilizante();
  }

  dowloadPDF() {
    var docDefinition = {
      pageOrientation: 'landscape',
      content: [
        {
          text: 'Registros Fertilizantes',
          style: 'header',
          alignment: 'center',
          fontSize: 20
        },
        {
          text: 'Fecha: '+ this.fechaNow +'\n\n',
          alignment: 'left',
          fontSize: 12
        },
        this.table(this.registros, [ {text: 'Fecha', bold: true, fillColor: '#D68910'},
        {text: 'Método aplicación', bold: true, fillColor: '#D68910'},
        {text: 'Estado Fenológico', bold: true, fillColor: '#D68910'},
        {text: 'Cantidad aplicada (L)', bold:true, fillColor: '#D68910'},
        {text: 'Tipo maquinaria', bold:true, fillColor: '#D68910'},
        {text: 'Run Encargado BPA', bold:true, fillColor: '#D68910'},
        {text: 'Nombre Fertilizante', bold:true, fillColor: '#D68910'},
        {text: 'Nombre cuartel', bold:true, fillColor: '#D68910'}
      ]),
      ],
    };
    pdfMake.createPdf(docDefinition).open();
  } //end docDefinition

  table(data: RegistroFertilizante[], columns) {
    return {
      border: [false,false,false,false,false,false,false,false],
      style: 'tableExample',
      table: {
        widths: ['auto', 'auto','auto',50,'auto','auto','auto','auto'],
        headerRows: 1,
        heights: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
        body: this.buildTableBody(data, columns),
      },
      layout: 'lightHorizontalLines',
      alignment: 'center'
    };
  }

  buildTableBody(data: RegistroFertilizante[], columns): any[] {
    const body = [];

    body.push(columns);

    data.forEach((row) => {
      var dataRow = [];
      dataRow.push({text: row.fecha, alignment: 'center'},
      {text: row.metodoAplicacion, alignment: 'center'},
      {text: row.estadoFenologico, alignment: 'center'},
      {text: row.cantidadAplicada, alignment: 'center'},
      {text: row.tipoMaquinaria, alignment: 'center'},
      {text: row.runEncargadoBPA, alignment: 'center'},
      {text: row.idFertilizante, alignment: 'center'},
      {text: row.idCuartel, alignment: 'center'});

      body.push(dataRow);
    });

    return body;
  }

  dowloadExcel() {
    let workbook = new Workbook();

    let worksheet = workbook.addWorksheet('Registros Fertilizantes');

    worksheet.columns =[
      {}
    ];
    worksheet.addRow([]);
    let titleRow = worksheet.addRow(['REGISTRO DE APLICACIÓN DE PRODUCTOS FERTILIZANTES']);
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
      'Fecha',
      'Metodo aplicación',
      'Estado fenológico',
      'Cantidad aplicada',
      'Tipo maquinaria',
      'Encargado BPA',
      'Fertilizante utilizado',
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

    for (let x1 of this.registros) {
      let temp = [];

      this.fecha = x1.fecha;
      this.metodoApli = x1.metodoAplicacion;
      this.estadoFeno = x1.estadoFenologico;
      this.cantodadApli = x1.cantidadAplicada;
      this.tipoMaqui = x1.tipoMaquinaria;
      this.encargadoBPA = x1.runEncargadoBPA;
      this.fertilizante = x1.idFertilizante;
      this.cuartel = x1.idCuartel;
      temp.push(
      this.fecha,
      this.metodoApli,
      this.estadoFeno,
      this.cantodadApli,
      this.tipoMaqui,
      this.encargadoBPA,
      this.fertilizante,
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
        if(i == 0) worksheet.columns[i].width = 14;
        if(i == 1) worksheet.columns[i].width = 30;
        if(i == 2) worksheet.columns[i].width = 30;
        if(i == 3) worksheet.columns[i].width = 20;
        if(i == 4) worksheet.columns[i].width = 18;
        if(i == 5) worksheet.columns[i].width = 20;
        if(i == 6) worksheet.columns[i].width = 22;
        if(i == 7) worksheet.columns[i].width = 20;
      }
    }

    let fname = 'Registros Fertilizantes';

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, fname + ' ' + this.fechaNow);
    });
  }
}
