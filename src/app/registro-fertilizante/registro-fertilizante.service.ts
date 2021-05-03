import { Injectable } from '@angular/core';
import { RegistroFertilizante } from './registro-fertilizante';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistroFertilizanteService {

  urlEndPoint: string = 'http://localhost:8080/api/registrosFertilizantes';

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient) { }

    getRegistrosFertilizantes(): Observable<RegistroFertilizante[]> {
      return this.http.get(this.urlEndPoint).pipe(
        map((response) => response as RegistroFertilizante[])
      );
    }

    crearRegistroFertilizantes(registroFertilizante: RegistroFertilizante): Observable<RegistroFertilizante> {
      return this.http.post<RegistroFertilizante>(this.urlEndPoint, registroFertilizante, { headers: this.httpHeaders });

    }

    getRegistroFertilizante(id: any): Observable<RegistroFertilizante> {
      return this.http.get<RegistroFertilizante>(`${this.urlEndPoint}/${id}`);
    }

    updateRegistroFertilizantes(registroFertilizante: RegistroFertilizante): Observable<RegistroFertilizante>{
      return this.http.put<RegistroFertilizante>(`${this.urlEndPoint}/${registroFertilizante.idRegistro}`, registroFertilizante, {headers: this.httpHeaders})
    }

    deleteRegistroFertilizantes(id: any): Observable<RegistroFertilizante>{
      return this.http.delete<RegistroFertilizante>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
    }
}
