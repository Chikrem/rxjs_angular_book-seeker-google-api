import { switchMap, map, tap, filter, debounceTime, throwError, catchError, EMPTY, of } from 'rxjs';
import { Component } from '@angular/core';
import { LivroService } from 'src/app/service/livro.service';
import { Item, LivrosResultado } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { FormControl } from '@angular/forms';

const PAUSA = 300;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  //https://rxjs-dev.firebaseapp.com/guide/subscription

  //https://rxjs-dev.firebaseapp.com/guide/observable

  campoBusca = new FormControl();
  mensagemErro = ''
  livrosResultado: LivrosResultado;

  constructor(private service: LivroService) { }

  // totalDeLivros$ = this.campoBusca.valueChanges
  // .pipe(
  //   debounceTime(PAUSA),
  //   filter((valorDigitado) => valorDigitado.length >= 3),
  //   tap(() => console.log('Fluxo inicial')),
  //   switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
  //   map(resultado => this.livrosResultado = resultado),
  //   catchError(erro => {
  //     console.log(erro)
  //     return of()
  //   })
  // )

  livrosEncontrados$ = this.campoBusca.valueChanges
    .pipe(
      debounceTime(PAUSA), // Inserir um pequeno delay para que dê tempo para as pessoas terminarem de digitar
      filter((valorDigitado) => valorDigitado.length >= 3),  // Filter onde passamos uma condição que, se for satisfeita, o fluxo segue.
      tap(() => console.log('Fluxo inicial')),
      switchMap((valorDigitado) => this.service.busca(valorDigitado)),
      map(resultado => this.livrosResultado = resultado),
      tap((retornoAPI) => console.log(retornoAPI)),
      map(resultado => resultado.items ?? []),
      map((items) => this.livrosResultadoParaLivros(items)),
      catchError((erro) => {
        // this.mensagemErro ='Ops, ocorreu um erro. Recarregue a aplicação!'
        // return EMPTY
        console.log(erro)
        return throwError(() => new Error(this.mensagemErro ='Ops, ocorreu um erro. Recarregue a aplicação!'))
      })
    )


//Pipe- Função que serve para agrupar múltiplos operadores. Não modifica o observable anterior.

// Tap - Operador de serviços públicos. Usado para debugging. Não modifica o observable.

// Map - Operador de transformação. Transforma o observable de acordo com a função passada. Retorna um observable modificado.

// switchMap - Operador de Transformação. Cancela requisições de observables anteriores, emitindo valores apenas do Observable projetado mais recentemente.

// filter - Operador de filtragem. Filtra os itens emitidos pelo Observable de origem, permitindo apenas aqueles que satisfaçam uma condição especificada.

// debounceTime - Operador de filtragem. Retorna um Observable que atrasa as emissões do Observable de origem pelo tempo especificado.

// distinctUntilChanged - Operador de filtragem. Retorna um Observable que emite todos os valores enviados pelo observable de origem se forem distintos em comparação com o último valor emitido pelo observable de resultado.

// catchError - Operador de Tratamento de Erros. Captura erros no observable manipulado retornando um novo observable ou lançando um erro.

// throwError - Operador de Criação. Cria um observable que criará uma instância de erro e a enviará ao consumidor como um erro imediatamente após a assinatura.

// EMPTY - Operador de Criação. Cria um Observable simples que não emite itens para o Observer e imediatamente emite uma notificação de complete.

// of - Operador de Criação. Converte os argumentos em observable. Um Observable que emite os argumentos descritos e depois conclui.


  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })
  }

}



function trhowError(arg0: () => Error) {
  throw new Error('Function not implemented.');
}
