import { Injectable } from '@angular/core';
import { ProductoFitosanitario } from './producto-fitosanitario';
import { Observable, throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError,tap } from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductoFitosanitarioService {

  urlEndPoint: string = 'http://localhost:8080/api/fitosanitarios';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

 constructor(private http: HttpClient, private router:Router) { }

 private isNoAutorizado(e):boolean{
      if(e.status==401 || e.status==403){
        this.router.navigate(['/login'])
        return true;
      }
      return false;
    }
  getFitosanitarios(): Observable<ProductoFitosanitario[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as ProductoFitosanitario[]),
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
    );
  }

  crearFitosanitario(fitosanitario: ProductoFitosanitario): Observable<ProductoFitosanitario> {
    return this.http.post<ProductoFitosanitario>(this.urlEndPoint, fitosanitario, { headers: this.httpHeaders }).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       );
  }
  //recordar en estos metodos que tanto el urlpoint como el valor por parametro
  //se pasa con las comillas especiales `
  getFitosanitario(id: any): Observable<ProductoFitosanitario> {
    return this.http.get<ProductoFitosanitario>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       );
  }

  //recordar en estos metodos que tanto el urlpoint como el valor por parametro
  //se pasa con las comillas especiales `
  updateEncargado(fitosanitario: ProductoFitosanitario): Observable<ProductoFitosanitario> {
    return this.http.put<ProductoFitosanitario>(`${this.urlEndPoint}/${fitosanitario.idFitosanitario}`, fitosanitario, { headers: this.httpHeaders }).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       )
  }

  //recordar en estos metodos que tanto el urlpoint como el valor por parametro
  //se pasa con las comillas especiales `
  deleteFitosanitario(id: any): Observable<ProductoFitosanitario> {
    return this.http.delete<ProductoFitosanitario>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       );
  }

}
