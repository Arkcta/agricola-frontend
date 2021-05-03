import { Injectable } from '@angular/core';
import { ProductoFertilizante } from './producto-fertilizante';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductoFertilizanteService {

   urlEndPoint: string = 'http://localhost:8080/api/fertilizantes';

   private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

   constructor(private http: HttpClient) { }

   getFertilizantes(): Observable<ProductoFertilizante[]> {
     return this.http.get(this.urlEndPoint).pipe(
       map((response) => response as ProductoFertilizante[])
     );
   }

   crearFertilizante(fertilizante: ProductoFertilizante): Observable<ProductoFertilizante> {
     return this.http.post<ProductoFertilizante>(this.urlEndPoint, fertilizante, { headers: this.httpHeaders });
   }

   getFertilizante(id: any): Observable<ProductoFertilizante> {
     return this.http.get<ProductoFertilizante>(`${this.urlEndPoint}/${id}`);
   }

   updateFertilizante(fertilizante: ProductoFertilizante): Observable<ProductoFertilizante> {
     return this.http.put<ProductoFertilizante>(`${this.urlEndPoint}/${fertilizante.idFertilizante}`, fertilizante, { headers: this.httpHeaders })
   }

   deleteFertilizante(id: any): Observable<ProductoFertilizante> {
     return this.http.delete<ProductoFertilizante>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders });
   }
}
