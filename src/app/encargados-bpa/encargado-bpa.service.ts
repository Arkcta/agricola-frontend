import { Injectable } from '@angular/core';
// import { ENCARGADOS } from './encargadosBPA.json';
import { EncargadoBPA } from './encargado-bpa';
import { Observable} from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EncargadoBPAService {

  urlEndPoint: string = 'http://localhost:8080/api/encargadosBPA';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<EncargadoBPA[]> {
    //return of(ENCARGADOS);
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as EncargadoBPA[])
    );
  }

  }
