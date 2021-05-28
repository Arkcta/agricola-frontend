import { Component, OnInit } from '@angular/core';
import { RegistroFertilizante } from './registro-fertilizante';
import { RegistroFertilizanteService } from './registro-fertilizante.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { formatDate } from '@angular/common';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-registro-fertilizante',
  templateUrl: './registro-fertilizante.component.html',
  styleUrls: ['./registro-fertilizante.component.css'],
})
export class RegistroFertilizanteComponent implements OnInit {

  registro: RegistroFertilizante = new RegistroFertilizante();
  registros: RegistroFertilizante[];
  headerColums: string[] = [ 'Fecha',
    'Método aplicación',
    'Estado Fenológico',
    'Cantidad aplicada (L)',
    'Tipo maquinaria',
    'Run Encargado BPA',
    'Nombre Fertilizante',
    'Nombre cuartel',
  ];
  now = new Date();
  anioNowString: string;
  mesNowString: string;
  dayNowString: string;
  fechaNow: string;

  constructor(
    private registroService: RegistroFertilizanteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

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

  // dowloadPDF() {
  //   console.table(this.registros);
  //   var docDefinition = {
  //     content: [
  //       {
  //         text: 'Registros Fertilizantes',
  //         alignment: 'center',
  //         bold: true,
  //         fontSize: 15,
  //       },
  //       {
  //         layout: 'lightHorizontalLines', // optional
  //         table: {
  //           table(this.registros, this.headerColums)

  //           // headers are automatically repeated if the table spans over multiple pages
  //           // you can declare how many rows should be treated as headers
  //           headerRows: 1,
  //           widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],

  //           body: [
  //             this.headerColums,
  //             ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 5', 'Valuew 6', 'Value 7', 'Valuew 8'],
  //             [{ text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4', 'Val 5', 'Valuew 6', 'Value 7', 'Valuew 8'],
  //           ],
  //         },
  //       },
  //     ],
  //   };

  //   pdfMake.createPdf(docDefinition).open();
  // }

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
}
