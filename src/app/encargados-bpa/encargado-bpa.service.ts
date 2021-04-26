import { Injectable } from '@angular/core';
// import { ENCARGADOS } from './encargadosBPA.json';
import { EncargadoBPA } from './encargado-bpa';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EncargadoBPAService {

  urlEndPoint: string = 'http://localhost:8080/api/encargadosBPA';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getEncargados(): Observable<EncargadoBPA[]> {
    //return of(ENCARGADOS);
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as EncargadoBPA[])
    );
  }

  crearEncargado(encargado: EncargadoBPA): Observable<EncargadoBPA> {
    return this.http.post<EncargadoBPA>(this.urlEndPoint, encargado, { headers: this.httpHeaders });

  }

  getEncargado(run: any): Observable<EncargadoBPA> {
    return this.http.get<EncargadoBPA>(`${this.urlEndPoint}/${run}`);
  }

  updateEncargado(encargado: EncargadoBPA): Observable<EncargadoBPA>{
    return this.http.put<EncargadoBPA>(`${this.urlEndPoint}/${encargado.run}`, encargado, {headers: this.httpHeaders})
  }

  deleteEncargado(run: any): Observable<EncargadoBPA>{
    return this.http.delete<EncargadoBPA>(`${this.urlEndPoint}/${run}`, {headers: this.httpHeaders});
  }

}
