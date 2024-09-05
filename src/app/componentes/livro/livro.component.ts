import { Component, Input } from '@angular/core';
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

  constructor() {}

  onModalChange(evento: boolean) {
    this.modalAberto = evento;
  }
}
