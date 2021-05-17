import { Injectable } from '@angular/core';
import {Cuartel} from './cuartel';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map,catchError,tap } from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CuartelService {

  urlEndPoint: string = 'http://localhost:8080/api/cuarteles';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router:Router) { }

  private isNoAutorizado(e):boolean{
       if(e.status==401 || e.status==403){
         this.router.navigate(['/login'])
         return true;
       }
       return false;
     }
  getCuarteles(): Observable<Cuartel[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as Cuartel[]),
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
    );
  }

  crearCuartel(cuartel: Cuartel): Observable<Cuartel> {
    return this.http.post<Cuartel>(this.urlEndPoint, cuartel, { headers: this.httpHeaders }).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       );

  }

  getCuartel(id: any): Observable<Cuartel> {
    return this.http.get<Cuartel>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       );
  }

  updateCuartel(cuartel:Cuartel): Observable<Cuartel>{
    return this.http.put<Cuartel>(`${this.urlEndPoint}/${cuartel.idCuartel}`, cuartel, {headers: this.httpHeaders}).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       )
  }

  deleteCuartel(id: any): Observable<Cuartel>{
    return this.http.delete<Cuartel>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       );
  }
}
