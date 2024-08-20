import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy{

  listaLivros: [];

  campoBusca: string = ''

  //https://rxjs-dev.firebaseapp.com/guide/subscription

  subscription: Subscription

  constructor(private service: LivroService) { }

  //https://rxjs-dev.firebaseapp.com/guide/observable

  buscarLivros() {    // .subscribe conecta o Observable ao Observer
    this.subscription = this.service.busca(this.campoBusca).subscribe({
      next: retornoAPI => console.log(retornoAPI),
      error: erro => console.error(erro),
      complete: () => console.log('Observe completo')
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}



