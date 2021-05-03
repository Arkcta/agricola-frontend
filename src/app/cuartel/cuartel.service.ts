import { Injectable } from '@angular/core';
import {Cuartel} from './cuartel';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CuartelService {

  urlEndPoint: string = 'http://localhost:8080/api/cuarteles';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getCuarteles(): Observable<Cuartel[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as Cuartel[])
    );
  }

  crearCuartel(cuartel: Cuartel): Observable<Cuartel> {
    return this.http.post<Cuartel>(this.urlEndPoint, cuartel, { headers: this.httpHeaders });

  }

  getCuartel(id: any): Observable<Cuartel> {
    return this.http.get<Cuartel>(`${this.urlEndPoint}/${id}`);
  }

  updateCuartel(cuartel:Cuartel): Observable<Cuartel>{
    return this.http.put<Cuartel>(`${this.urlEndPoint}/${cuartel.idCuartel}`, cuartel, {headers: this.httpHeaders})
  }

  deleteCuartel(id: any): Observable<Cuartel>{
    return this.http.delete<Cuartel>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }
}
