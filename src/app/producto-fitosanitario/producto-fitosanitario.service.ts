import { Injectable } from '@angular/core';
import { ProductoFitosanitario } from './producto-fitosanitario';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoFitosanitarioService {

  urlEndPoint: string = 'http://localhost:8080/api/fitosanitarios';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  public getFitosanitarios(): Observable<ProductoFitosanitario[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as ProductoFitosanitario[])
    );
  }

  crearFitosanitario(fitosanitario: ProductoFitosanitario): Observable<ProductoFitosanitario> {
    return this.http.post<ProductoFitosanitario>(this.urlEndPoint, fitosanitario, { headers: this.httpHeaders });
  }
  //recordar en estos metodos que tanto el urlpoint como el valor por parametro
  //se pasa con las comillas especiales `
  getFitosanitario(id: any): Observable<ProductoFitosanitario> {
    return this.http.get<ProductoFitosanitario>(`${this.urlEndPoint}/${id}`);
  }

  //recordar en estos metodos que tanto el urlpoint como el valor por parametro
  //se pasa con las comillas especiales `
  updateEncargado(fitosanitario: ProductoFitosanitario): Observable<ProductoFitosanitario> {
    return this.http.put<ProductoFitosanitario>(`${this.urlEndPoint}/${fitosanitario.idFitosanitario}`, fitosanitario, { headers: this.httpHeaders })
  }

  //recordar en estos metodos que tanto el urlpoint como el valor por parametro
  //se pasa con las comillas especiales `
  deleteFitosanitario(id: any): Observable<ProductoFitosanitario> {
    return this.http.delete<ProductoFitosanitario>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders });
  }

}
