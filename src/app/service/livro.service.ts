import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LivrosResultado } from '../models/interfaces';

// -> rxjs Se trata de uma biblioteca para construção de programas assíncronos, ou baseados em eventos. Ela utiliza uma coleção de Observables.


@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes'
  constructor(private http: HttpClient) { }

  //https://v17.angular.io/guide/http-request-data-from-server#requesting-a-typed-response

  busca(valorDigitado: string): Observable<LivrosResultado> {
    const params = new HttpParams().append('q', valorDigitado )
    return this.http.get<LivrosResultado>(this.API, { params })
  }
}


