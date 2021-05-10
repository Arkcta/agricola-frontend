import { Injectable } from '@angular/core';
// import { ENCARGADOS } from './encargadosBPA.json';
import { EncargadoBPA } from './encargado-bpa';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EncargadoBPAService {

  urlEndPoint: string = 'http://localhost:8080/api/encargadosBPA';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router ) { }

  getEncargados(): Observable<EncargadoBPA[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as EncargadoBPA[])
    );
  }

  crearEncargado(encargado: EncargadoBPA): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, encargado, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        //this.router.navigate(['/encargadosBPA'])
        swal.fire('Error al agregar', e.error.mensaje, 'error');
        return throwError(e);
      }));

  }

  getEncargado(run: any): Observable<EncargadoBPA> {
    return this.http.get<EncargadoBPA>(`${this.urlEndPoint}/${run}`).pipe(
      catchError(e => {
        this.router.navigate(['/encargadosBPA'])
        swal.fire('Error al buscar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  updateEncargado(encargadoActual: EncargadoBPA, encargadoEditado: EncargadoBPA): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${encargadoActual.run}`, encargadoEditado, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        //this.router.navigate(['/encargadosBPA'])
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      }));
  }

  deleteEncargado(run: any): Observable<EncargadoBPA>{
    return this.http.delete<EncargadoBPA>(`${this.urlEndPoint}/${run}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        //this.router.navigate(['/encargadosBPA'])
        swal.fire('Error al eliminar', e.error.mensaje, 'error');
        return throwError(e);
      }));;
  }

}
