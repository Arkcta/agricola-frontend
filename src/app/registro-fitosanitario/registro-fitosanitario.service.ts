import { Injectable } from '@angular/core';
import { RegistroFitosanitario } from './registro-fitosanitario';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistroFitosanitarioService {

  urlEndPoint: string = 'http://localhost:8080/api/registrosFitosanitarios';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getRegistrosFito(): Observable<RegistroFitosanitario[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as RegistroFitosanitario[])
    );
  }

  crearRegistroFito(regisFito: RegistroFitosanitario): Observable<RegistroFitosanitario> {
    return this.http.post<RegistroFitosanitario>(this.urlEndPoint, regisFito, { headers: this.httpHeaders });

  }

  getRegistroFito(id: any): Observable<RegistroFitosanitario> {
    return this.http.get<RegistroFitosanitario>(`${this.urlEndPoint}/${id}`);
  }

  updateRegistroFito(regisFito: RegistroFitosanitario): Observable<RegistroFitosanitario>{
    return this.http.put<RegistroFitosanitario>(`${this.urlEndPoint}/${regisFito.idRegistroFitosanitario}`, regisFito, {headers: this.httpHeaders})
  }

  deleteRegistroFito(id: any): Observable<RegistroFitosanitario>{
    return this.http.delete<RegistroFitosanitario>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }
}
