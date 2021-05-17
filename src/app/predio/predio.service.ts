import { Injectable } from '@angular/core';
import { Predio } from './predio';
import { Observable, throwError  } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError,tap } from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PredioService {

  urlEndPoint: string = 'http://localhost:8080/api/predios';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient,private router:Router ) { }

  private isNoAutorizado(e):boolean{
       if(e.status==401 || e.status==403){
         this.router.navigate(['/login'])
         return true;
       }
       return false;
     }
  getPredios(): Observable<Predio[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as Predio[]),
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
    );
  }

  crearPredio(predio: Predio): Observable<Predio> {
    return this.http.post<Predio>(this.urlEndPoint, predio, { headers: this.httpHeaders }).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       );

  }

  getPredio(id: any): Observable<Predio> {
    return this.http.get<Predio>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       );
  }

  updatePredio(predio: Predio): Observable<Predio>{
    return this.http.put<Predio>(`${this.urlEndPoint}/${predio.idPredio}`, predio, {headers: this.httpHeaders}).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       )
  }

  deletePredio(id: any): Observable<Predio>{
    return this.http.delete<Predio>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       );
  }
}
