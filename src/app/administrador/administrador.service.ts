import { Injectable } from '@angular/core';
import { Administrador } from './Administrador';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from '../usuarios/auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

    urlEndPoint: string = 'http://localhost:8080/api/administradores';

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient, private router:Router,
    private authService: AuthService) { }

    private agregarAuthorizationHeader(){
      let token = this.authService.token;
      if(token != null){
        return this.httpHeaders.append('Authorization', 'Bearer ' + token);
      }
      return this.httpHeaders;
    }

    private isNoAutorizado(e):boolean{
      if(e.status==401){
        if(this.authService.isAuthenticated()){
          this.authService.logout();
        }
        this.router.navigate(['/login'])
        return true;
      }
      if( e.status==403){
        swal.fire("Acceso denegado", `Hola ${this.authService.usuario.nombre}  no tienes acceso a este recurso`,'warning');
        this.router.navigate(['/home'])
        return true;
      }
      return false;
    }
    getAdministradores(): Observable<Administrador[]> {
      return this.http.get(this.urlEndPoint, {headers: this.agregarAuthorizationHeader()}).pipe(
        map((response) => response as Administrador[]),
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })

      );
    }


    crearAdministrador(administrador: Administrador): Observable<Administrador> {
      return this.http.post<Administrador>(this.urlEndPoint, administrador, {headers: this.agregarAuthorizationHeader()}).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       )
    }

    getAdministrador(run: any): Observable<Administrador> {
      return this.http.get<Administrador>(`${this.urlEndPoint}/${run}`,{headers: this.agregarAuthorizationHeader()}).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       );
    }

    updateAdministrador(administrador: Administrador): Observable<Administrador>{
      return this.http.put<Administrador>(`${this.urlEndPoint}/${administrador.run}`, administrador, {headers: this.agregarAuthorizationHeader()}).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       )
    }

    deleteAdministrador(run: any): Observable<Administrador>{
      return this.http.delete<Administrador>(`${this.urlEndPoint}/${run}`, {headers: this.agregarAuthorizationHeader()}).pipe(
        catchError(e =>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
       );
    }
}
