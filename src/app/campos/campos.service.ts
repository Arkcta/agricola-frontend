import { Injectable } from '@angular/core';
import { Campos } from './campos';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map,catchError,tap } from 'rxjs/operators';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class CamposService {

  urlEndPoint: string = 'http://localhost:8080/api/campos';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router:Router) { }
  private isNoAutorizado(e):boolean{
        if(e.status==401 || e.status==403){
          this.router.navigate(['/login'])
          return true;
        }
        return false;
      }
  getCampos(): Observable<Campos[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as Campos[]),
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
    );
  }

  crearCampo(campo: Campos): Observable<Campos> {
    return this.http.post<Campos>(this.urlEndPoint, campo, { headers: this.httpHeaders }).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       );

  }

  getCampo(id: any): Observable<Campos> {
    return this.http.get<Campos>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       );
  }

  updateCampo(campo: Campos): Observable<Campos>{
    return this.http.put<Campos>(`${this.urlEndPoint}/${campo.idCampo}`, campo, {headers: this.httpHeaders}).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       )
  }

  deleteCampo(id: any): Observable<Campos>{
    return this.http.delete<Campos>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       );
  }
}
