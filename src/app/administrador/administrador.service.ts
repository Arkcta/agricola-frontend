import { Injectable } from '@angular/core';
import { Administrador } from './Administrador';
import { Observable} from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from '../usuarios/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

    urlEndPoint: string = 'http://localhost:8080/api/administradores';

    constructor(private http: HttpClient, private router:Router,
    private authService: AuthService) { }



    getAdministradores(): Observable<Administrador[]> {
      return this.http.get(this.urlEndPoint).pipe(
        map((response) => response as Administrador[])
      );
    }


    crearAdministrador(administrador: Administrador): Observable<Administrador> {
      return this.http.post<Administrador>(this.urlEndPoint, administrador)
    }

    getAdministrador(run: any): Observable<Administrador> {
      return this.http.get<Administrador>(`${this.urlEndPoint}/${run}`);
    }

    updateAdministrador(administrador: Administrador): Observable<Administrador>{
      return this.http.put<Administrador>(`${this.urlEndPoint}/${administrador.run}`, administrador);
    }

    deleteAdministrador(run: any): Observable<Administrador>{
      return this.http.delete<Administrador>(`${this.urlEndPoint}/${run}`);
    }
}
