import { Injectable } from '@angular/core';
import { ListarRegistrosFitosanitarios } from './listar-registros-fitosanitarios';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ListarRegistrosFitosanitariosService {

    urlEndPoint: string = 'http://localhost:8080/api/registrosFitosanitarios';

    constructor(private http: HttpClient) { }

    getRegistrosFito(): Observable<ListarRegistrosFitosanitarios[]> {
      return this.http.get(this.urlEndPoint).pipe(
        map((response) => response as ListarRegistrosFitosanitarios[])
      );
    }
}
