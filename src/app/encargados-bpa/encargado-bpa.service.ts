import { Injectable } from '@angular/core';
import { EncargadoBPA } from './encargado-bpa';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError,tap } from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EncargadoBPAService {

  urlEndPoint: string = 'http://localhost:8080/api/encargadosBPA';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router:Router) { }

  private isNoAutorizado(e):boolean{
      if(e.status==401 || e.status==403){
        this.router.navigate(['/login'])
        return true;
      }
      return false;
    }

  getEncargados(): Observable<EncargadoBPA[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as EncargadoBPA[]),
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
    );
  }

  crearEncargado(encargado: EncargadoBPA): Observable<EncargadoBPA> {
    return this.http.post<EncargadoBPA>(this.urlEndPoint, encargado, { headers: this.httpHeaders }).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       );

  }

  getEncargado(run: any): Observable<EncargadoBPA> {
    return this.http.get<EncargadoBPA>(`${this.urlEndPoint}/${run}`).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       );
  }

  updateEncargado(encargado: EncargadoBPA): Observable<EncargadoBPA>{
    return this.http.put<EncargadoBPA>(`${this.urlEndPoint}/${encargado.run}`, encargado, {headers: this.httpHeaders}).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       )
  }

  deleteEncargado(run: any): Observable<EncargadoBPA>{
    return this.http.delete<EncargadoBPA>(`${this.urlEndPoint}/${run}`, {headers: this.httpHeaders}).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       );
  }

}
