import { Injectable } from '@angular/core';
import { Administrador } from './Administrador';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError,tap } from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

    urlEndPoint: string = 'http://localhost:8080/api/administradores';

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient, private router:Router) { }

    private isNoAutorizado(e):boolean{
      if(e.status==401 || e.status==403){
        this.router.navigate(['/login'])
        return true;
      }
      return false;
    }
    getAdministradores(): Observable<Administrador[]> {
      return this.http.get(this.urlEndPoint).pipe(
        map((response) => response as Administrador[]),
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })

      );
    }

    
    crearAdministrador(administrador: Administrador): Observable<Administrador> {
      return this.http.post<Administrador>(this.urlEndPoint, administrador, { headers: this.httpHeaders }).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       )
    }

    getAdministrador(run: any): Observable<Administrador> {
      return this.http.get<Administrador>(`${this.urlEndPoint}/${run}`).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       );
    }

    updateAdministrador(administrador: Administrador): Observable<Administrador>{
      return this.http.put<Administrador>(`${this.urlEndPoint}/${administrador.run}`, administrador, {headers: this.httpHeaders}).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       )
    }

    deleteAdministrador(run: any): Observable<Administrador>{
      return this.http.delete<Administrador>(`${this.urlEndPoint}/${run}`, {headers: this.httpHeaders}).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       );
    }
}
