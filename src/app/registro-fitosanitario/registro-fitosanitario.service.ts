import { Injectable } from '@angular/core';
import { RegistroFitosanitario } from './registro-fitosanitario';
import { Observable, throwError  } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError,tap } from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegistroFitosanitarioService {

  urlEndPoint: string = 'http://localhost:8080/api/registrosFitosanitarios';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router:Router) { }

  private isNoAutorizado(e):boolean{
      if(e.status==401 || e.status==403){
        this.router.navigate(['/login'])
        return true;
      }
      return false;
    }

  getRegistrosFito(): Observable<RegistroFitosanitario[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as RegistroFitosanitario[]),
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
    );
  }

  crearRegistroFito(regisFito: RegistroFitosanitario): Observable<RegistroFitosanitario> {
    return this.http.post<RegistroFitosanitario>(this.urlEndPoint, regisFito, { headers: this.httpHeaders }).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       );

  }

  getRegistroFito(id: any): Observable<RegistroFitosanitario> {
    return this.http.get<RegistroFitosanitario>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       );
  }

  updateRegistroFito(regisFito: RegistroFitosanitario): Observable<RegistroFitosanitario>{
    return this.http.put<RegistroFitosanitario>(`${this.urlEndPoint}/${regisFito.idRegistroFitosanitario}`, regisFito, {headers: this.httpHeaders}).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       )
  }

  deleteRegistroFito(id: any): Observable<RegistroFitosanitario>{
    return this.http.delete<RegistroFitosanitario>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       );
  }
}
