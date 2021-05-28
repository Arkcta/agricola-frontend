import { Component, OnInit } from '@angular/core';
import { RegistroFitosanitario } from './registro-fitosanitario';
import { RegistroFitosanitarioService } from './registro-fitosanitario.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { formatDate } from '@angular/common';
import pdfMake from 'pdfmake/build/pdfmake';
import * as XLSX from 'xlsx';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-registro-fitosanitario',
  templateUrl: './registro-fitosanitario.component.html',
  styleUrls: ['./registro-fitosanitario.component.css']
})
export class RegistroFitosanitarioComponent implements OnInit {

  registrosFitosanitarios: RegistroFitosanitario[];
  registroFitosanitario: RegistroFitosanitario = new RegistroFitosanitario();
  now = new Date();
  anioNowString: string;
  mesNowString: string;
  dayNowString: string;
  fechaNow: string;

  userList = [
    {    
    "id": 1,   
    "name": "Leanne Graham",    
    "username": "Bret",    
    "email": "Sincere@april.biz"    
    },    
    {    
    "id": 2,    
    "name": "Ervin Howell",    
    "username": "Antonette",    
    "email": "Shanna@melissa.tv"    
    },    
    {    
    "id": 3,    
    "name": "Clementine Bauch",    
    "username": "Samantha",    
    "email": "Nathan@yesenia.net"    
    },    
    {    
    "id": 4,    
    "name": "Patricia Lebsack",    
    "username": "Karianne",    
    "email": "Julianne.OConner@kory.org"    
    },    
    {    
    "id": 5,    
    "name": "Chelsey Dietrich",    
    "username": "Kamren",    
    "email": "Lucio_Hettinger@annie.ca"    
    }
  ]










  constructor(private regisFitoService: RegistroFitosanitarioService,
     private router: Router, private activatedRoute: ActivatedRoute, public authService: AuthService) { }

  ngOnInit(): void {
    this.listaRegistroFitoService();
    this.anioNowString = formatDate(this.now, 'yyyy', 'en-US', '+0530');
    this.mesNowString = formatDate(this.now, 'MM', 'en-US', '+0530');
    this.dayNowString = formatDate(this.now, 'dd', 'en-US', '+0530');
    this.fechaNow = Number(this.dayNowString)-1+"/"+this.mesNowString+"/"+this.anioNowString;
  }

  listaRegistroFitoService() {
    this.regisFitoService.getRegistrosFito().subscribe(
      (regiFito) => {this.registrosFitosanitarios = regiFito}  //se agrega {this.encargadosBPA = encargados, otra cosa} al this cuando hay mas de una linea de codigo tambien al encargados cuando son mas de 1 parametro
    );
  }

  delete(regiFito: RegistroFitosanitario): void {

    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: '¿Seguro que desea eliminar el Registro Fitosanitario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.regisFitoService.deleteRegistroFito(regiFito.idRegistroFitosanitario).subscribe(
          response => {
            this.registrosFitosanitarios = this.registrosFitosanitarios.filter(reFito => reFito !== regiFito);
          }
        )
        swalWithBootstrapButtons.fire(
          'Registro Fitosanitario eliminado!',
          'El Registro Fitosanitario ha sido eliminado.',
          'success'
        )
      } else if (
        result.dismiss === swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'La eliminación del Registro Fitosanitario se canceló',
          'error'
        )
      }
    })
  }

  crear(): void {


    this.regisFitoService.crearRegistroFito(this.registroFitosanitario).subscribe(
      encargado => {
        this.router.navigate(['/registrosFitosanitarios'])
        swal.fire('Nuevo Registro Fitosanitario', 'El Registro Fitosanitario, ha sido creado con éxito', 'success');
        this.listaRegistroFitoService();
      }
    )
  }

  update(): void {
    this.regisFitoService.updateRegistroFito(this.registroFitosanitario).subscribe(
      encargado => {
        this.router.navigate(['/registrosFitosanitarios']);
        swal.fire('Registro Fitosanitario actualizado', 'El registro ha sido actualizado con éxito', 'success');
        this.listaRegistroFitoService();
      }
    )

  }

  cargarRegistroFito(id: number): void {
    this.activatedRoute.params.subscribe(params => {
      //let id = params['run'];
      if (id) {
        this.regisFitoService.getRegistroFito(id).subscribe((reg) => this.registroFitosanitario = reg);
      }
    })
  }

  vaciarInputs() {
    this.registroFitosanitario = new RegistroFitosanitario();
  }

  dowloadPDF() {
    var docDefinition = {
      pageOrientation: 'landscape',
      content: [
        {
          text: 'Registros Fitosanitarios',
          style: 'header',
          alignment: 'center',
          fontSize: 20
        },
        {
          text: 'Fecha: '+ this.fechaNow +'\n\n',
          alignment: 'left',
          fontSize: 12
        },
        this.table(this.registrosFitosanitarios, [ {text: 'Tipo maquinaria', bold: true, fillColor: '#D68910'},
        {text: 'Estado fenologico', bold: true, fillColor: '#D68910'},
        {text: 'Dosis', bold: true, fillColor: '#D68910'},
        {text: 'Fecha', bold:true, fillColor: '#D68910'},
        {text: 'Hora termino', bold:true, fillColor: '#D68910'},
        {text: 'Condiciones metereologicas', bold:true, fillColor: '#D68910'},
        {text: 'Run Encargado BPA', bold:true, fillColor: '#D68910'},
        {text: 'Nombre Fitosanitario', bold:true, fillColor: '#D68910'},
        {text: 'Nombre Cuartel', bold:true, fillColor: '#D68910'}
      ]),
      ],
    };
    pdfMake.createPdf(docDefinition).open();
  } //end docDefinition

  table(data: RegistroFitosanitario[], columns) {
    return {
      border: [false,false,false,false,false,false,false,false,false],
      style: 'tableExample',
      table: {
        widths: ['auto','auto','auto','auto','auto','auto','auto','auto','auto'],
        headerRows: 1,
        heights: [30, 30, 30, 30, 30, 30, 30, 30, 30],
        body: this.buildTableBody(data, columns),
      },
      layout: 'lightHorizontalLines',
      alignment: 'center'
    };
  }

  buildTableBody(data: RegistroFitosanitario[], columns): any[] {
    const body = [];

    body.push(columns);

    data.forEach((row) => {
      var dataRow = [];
      dataRow.push({text: row.tipoMaquinaria, alignment: 'center'},
      {text: row.estadoFenologico, alignment: 'center'},
      {text: row.dosis, alignment: 'center'},
      {text: row.fecha, alignment: 'center'},
      {text: row.horaTermino, alignment: 'center'},
      {text: row.condicionesMetereologicas, alignment: 'center'},
      {text: row.idEncargadoBPA, alignment: 'center'},
      {text: row.idFitosanitario, alignment: 'center'},
      {text: row.idCuartel, alignment: 'center'});

      body.push(dataRow);
    });

    return body;
  }

  dowloadExcel(){
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, "excel prueba");
  }
}
