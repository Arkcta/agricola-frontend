import { Injectable } from '@angular/core';
import { ProductoFitosanitario } from './producto-fitosanitario';
import { Observable, throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductoFitosanitarioService {

  urlEndPoint: string = 'http://localhost:8080/api/fitosanitarios';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

  getFitosanitarios(): Observable<ProductoFitosanitario[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as ProductoFitosanitario[])
    );
  }

  crearFitosanitario(fitosanitario: ProductoFitosanitario): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, fitosanitario, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        swal.fire('Error al agregar', e.error.mensaje, 'error');
        return throwError(e);
      }));
  }
  //recordar en estos metodos que tanto el urlpoint como el valor por parametro
  //se pasa con las comillas especiales `
  getFitosanitario(id: any): Observable<ProductoFitosanitario> {
    return this.http.get<ProductoFitosanitario>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/fitosanitarios'])
        swal.fire('Error al buscar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  //recordar en estos metodos que tanto el urlpoint como el valor por parametro
  //se pasa con las comillas especiales `
  updateEncargado(fitosanitarioActual: ProductoFitosanitario, fitosanitarioEditado: ProductoFitosanitario): Observable<ProductoFitosanitario> {
    return this.http.put<ProductoFitosanitario>(`${this.urlEndPoint}/${fitosanitarioActual.idFitosanitario}`, fitosanitarioEditado, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        //this.router.navigate(['/encargadosBPA'])
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      }));
  }

  //recordar en estos metodos que tanto el urlpoint como el valor por parametro
  //se pasa con las comillas especiales `
  deleteFitosanitario(id: any): Observable<ProductoFitosanitario> {
    return this.http.delete<ProductoFitosanitario>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        //this.router.navigate(['/encargadosBPA'])
        swal.fire('Error al eliminar', e.error.mensaje, 'error');
        return throwError(e);
      }));
  }

}
