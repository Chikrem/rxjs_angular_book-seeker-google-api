import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Livro } from '../../models/interfaces';
import { AutoriaPipe } from '../../pipes/autoria.pipe';
import { ModalComponent } from '../../pages/modal/modal.component';

import { trigger, transition, query, style, stagger, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-livro',
  standalone: true,
  imports: [CommonModule, AutoriaPipe, ModalComponent],
  templateUrl: './livro.component.html',
  styleUrl: './livro.component.css',
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-50px)' }),
          stagger('100ms', [
            animate('500ms ease-out', keyframes([
              style({ opacity: 0, transform: 'translateY(-50px)', offset: 0 }),
              style({ opacity: 0.5, transform: 'translateY(-25px)', offset: 0.3 }),
              style({ opacity: 1, transform: 'none', offset: 1 }),
            ])),
          ]),
        ], { optional: true }),
        query(':leave', [
          stagger('100ms', [
            animate('500ms ease-out', keyframes([
              style({ opacity: 1, transform: 'none', offset: 0 }),
              style({ opacity: 0.5, transform: 'translateY(-25px)', offset: 0.3 }),
              style({ opacity: 0, transform: 'translateY(-50px)', offset: 1 }),
            ])),
          ]),
        ], { optional: true }),
      ]),
    ]),
  ]
})
export class LivroComponent {

  @Input() livro!: Livro;
  modalAberto: boolean = false;

  constructor(
    private renderer: Renderer2,
    private element: ElementRef
) {}

// Entre seus métodos, destacam-se:

// setStyle: Utilizado para definir estilos em um elemento DOM, proporcionando uma maneira segura de modificar a apresentação visual.

// createElement: Essencial para criar dinamicamente elementos DOM, oferecendo flexibilidade na construção de interfaces interativas.

// createText: Permite a criação de nós de texto, contribuindo para a manipulação de conteúdo textual em tempo de execução.

// appendChild e removeChild: Essenciais para adicionar e remover elementos filhos, controlando a estrutura do DOM de maneira segura.

// setAttribute: Utilizado para definir atributos em elementos, possibilitando a configuração dinâmica de propriedades.

// addClass e removeClass: Contribuem para a adição e remoção de classes, permitindo a manipulação de estilos de forma modular.

onModalChange(evento: boolean) {
  this.modalAberto = evento;
  this.renderer.setStyle(
      this.element.nativeElement.ownerDocument.body, 'overflow', 'hidden')
}
}
