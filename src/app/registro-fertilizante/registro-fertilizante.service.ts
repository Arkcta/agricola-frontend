import { Injectable } from '@angular/core';
import { RegistroFertilizante } from './registro-fertilizante';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError,tap } from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegistroFertilizanteService {

  urlEndPoint: string = 'http://localhost:8080/api/registrosFertilizantes';

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

     constructor(private http: HttpClient, private router:Router) { }

     private isNoAutorizado(e):boolean{
       if(e.status==401 || e.status==403){
         this.router.navigate(['/login'])
         return true;
       }
       return false;
     }

    getRegistrosFertilizantes(): Observable<RegistroFertilizante[]> {
      return this.http.get(this.urlEndPoint).pipe(
        map((response) => response as RegistroFertilizante[]),
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
      );
    }

    crearRegistroFertilizantes(registroFertilizante: RegistroFertilizante): Observable<RegistroFertilizante> {
      return this.http.post<RegistroFertilizante>(this.urlEndPoint, registroFertilizante, { headers: this.httpHeaders }).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       );

    }

    getRegistroFertilizante(id: any): Observable<RegistroFertilizante> {
      return this.http.get<RegistroFertilizante>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       );
    }

    updateRegistroFertilizantes(registroFertilizante: RegistroFertilizante): Observable<RegistroFertilizante>{
      return this.http.put<RegistroFertilizante>(`${this.urlEndPoint}/${registroFertilizante.idRegistro}`, registroFertilizante, {headers: this.httpHeaders}).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       )
    }

    deleteRegistroFertilizantes(id: any): Observable<RegistroFertilizante>{
      return this.http.delete<RegistroFertilizante>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       );
    }
}
