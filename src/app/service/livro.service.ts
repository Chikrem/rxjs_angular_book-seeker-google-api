import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// -> rxjs Se trata de uma biblioteca para construção de programas assíncronos, ou baseados em eventos. Ela utiliza uma coleção de Observables.

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes'

  constructor(private http: HttpClient) { }

  busca(valorDigitado: string): Observable<any>{
    const params = new HttpParams().append('q', valorDigitado)
    return this.http.get(this.API, { params })
  }
}
