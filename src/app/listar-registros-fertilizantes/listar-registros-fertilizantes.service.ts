import { Injectable } from '@angular/core';
import { ListarRegistrosFertilizantes } from './listar-registros-fertilizantes';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ListarRegistrosFertilizantesService {

  urlEndPoint: string = 'http://localhost:8080/api/registrosFertilizantes';

    constructor(private http: HttpClient) { }

    getRegistrosFertilizantes(): Observable<ListarRegistrosFertilizantes[]> {
      return this.http.get(this.urlEndPoint).pipe(
        map((response) => response as ListarRegistrosFertilizantes[])
      );
    }

}
