import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Item, LivrosResultado } from '../models/interfaces';


// -> rxjs Se trata de uma biblioteca para construção de programas assíncronos, ou baseados em eventos. Ela utiliza uma coleção de Observables.

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes'

  constructor(private http: HttpClient) { }

  //https://v17.angular.io/guide/http-request-data-from-server#requesting-a-typed-response

  busca(valorDigitado: string): Observable<Item[]>{
    const params = new HttpParams().append('q', valorDigitado)
    return this.http.get<LivrosResultado>(this.API, { params }).pipe(
      tap(retornoAPI => console.log('Fluxo do Tap',retornoAPI)),
      map(resultado => resultado.items),
      tap(resultado => console.log('Fluxo após Map',resultado))
    )
  }
}

//Pipe- Função que serve para agrupar múltiplos operadores. Não modifica o observable anterior.

// Tap - Operador de serviços públicos. Usado para debugging. Não modifica o observable.

// Map - Operador de transformação. Transforma o observable de acordo com a função passada. Retorna um observable modificado.
