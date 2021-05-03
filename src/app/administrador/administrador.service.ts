import { Injectable } from '@angular/core';
import { Administrador } from './Administrador';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

    urlEndPoint: string = 'http://localhost:8080/api/administradores';

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient) { }

    getAdministradores(): Observable<Administrador[]> {
      return this.http.get(this.urlEndPoint).pipe(
        map((response) => response as Administrador[])
      );
    }

    crearAdministrador(administrador: Administrador): Observable<Administrador> {
      return this.http.post<Administrador>(this.urlEndPoint, administrador, { headers: this.httpHeaders });

    }

    getAdministrador(run: any): Observable<Administrador> {
      return this.http.get<Administrador>(`${this.urlEndPoint}/${run}`);
    }

    updateAdministrador(administrador: Administrador): Observable<Administrador>{
      return this.http.put<Administrador>(`${this.urlEndPoint}/${administrador.run}`, administrador, {headers: this.httpHeaders})
    }

    deleteAdministrador(run: any): Observable<Administrador>{
      return this.http.delete<Administrador>(`${this.urlEndPoint}/${run}`, {headers: this.httpHeaders});
    }
}
