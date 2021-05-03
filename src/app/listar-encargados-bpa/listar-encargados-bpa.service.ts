import { Injectable } from '@angular/core';
import { ListarEncargadosBpa} from './listar-encargados-bpa';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ListarEncargadosBpaService {
  urlEndPoint: string = 'http://localhost:8080/api/encargadosBPA';

    constructor(private http: HttpClient) { }

    getEncargados(): Observable<ListarEncargadosBpa[]> {
      return this.http.get(this.urlEndPoint).pipe(
        map((response) => response as ListarEncargadosBpa[])
      );
    }
}
