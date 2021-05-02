import { Injectable } from '@angular/core';
import { Predio } from './predio';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PredioService {

  urlEndPoint: string = 'http://localhost:8080/api/predios';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getPredios(): Observable<Predio[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as Predio[])
    );
  }

  crearPredio(predio: Predio): Observable<Predio> {
    return this.http.post<Predio>(this.urlEndPoint, predio, { headers: this.httpHeaders });

  }

  getPredio(id: any): Observable<Predio> {
    return this.http.get<Predio>(`${this.urlEndPoint}/${id}`);
  }

  updatePredio(predio: Predio): Observable<Predio>{
    return this.http.put<Predio>(`${this.urlEndPoint}/${predio.idPredio}`, predio, {headers: this.httpHeaders})
  }

  deletePredio(id: any): Observable<Predio>{
    return this.http.delete<Predio>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }
}
