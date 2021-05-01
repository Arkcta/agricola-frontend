import { Injectable } from '@angular/core';
import { Campos } from './campos';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CamposService {

  urlEndPoint: string = 'http://localhost:8080/api/campos';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getCampos(): Observable<Campos[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as Campos[])
    );
  }

  crearCampo(campo: Campos): Observable<Campos> {
    return this.http.post<Campos>(this.urlEndPoint, campo, { headers: this.httpHeaders });

  }

  getCampo(id: any): Observable<Campos> {
    return this.http.get<Campos>(`${this.urlEndPoint}/${id}`);
  }

  updateCampo(campo: Campos): Observable<Campos>{
    return this.http.put<Campos>(`${this.urlEndPoint}/${campo.idCampo}`, campo, {headers: this.httpHeaders})
  }

  deleteCampo(id: any): Observable<Campos>{
    return this.http.delete<Campos>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }
}
