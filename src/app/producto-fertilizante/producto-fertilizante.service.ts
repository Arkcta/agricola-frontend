import { Injectable } from '@angular/core';
import { ProductoFertilizante } from './producto-fertilizante';
import { Observable, throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError,tap } from 'rxjs/operators';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ProductoFertilizanteService {

   urlEndPoint: string = 'http://localhost:8080/api/fertilizantes';

   private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

   constructor(private http: HttpClient,private router:Router) { }

   private isNoAutorizado(e):boolean{
        if(e.status==401 || e.status==403){
          this.router.navigate(['/login'])
          return true;
        }
        return false;
      }

   getFertilizantes(): Observable<ProductoFertilizante[]> {
     return this.http.get(this.urlEndPoint).pipe(
       map((response) => response as ProductoFertilizante[]),
       catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
     );
   }

   crearFertilizante(fertilizante: ProductoFertilizante): Observable<ProductoFertilizante> {
     return this.http.post<ProductoFertilizante>(this.urlEndPoint, fertilizante, { headers: this.httpHeaders }).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       );
   }

   getFertilizante(id: any): Observable<ProductoFertilizante> {
     return this.http.get<ProductoFertilizante>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       );
   }

   updateFertilizante(fertilizante: ProductoFertilizante): Observable<ProductoFertilizante> {
     return this.http.put<ProductoFertilizante>(`${this.urlEndPoint}/${fertilizante.idFertilizante}`, fertilizante, { headers: this.httpHeaders }).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       )
   }

   deleteFertilizante(id: any): Observable<ProductoFertilizante> {
     return this.http.delete<ProductoFertilizante>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       );
   }
}
