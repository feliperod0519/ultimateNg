import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'letsChat-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() escondaComponentesDeBienvenida = new EventEmitter<any>();

  redireccioneALogIn(){
    this.escondaComponentesDeBienvenida.emit({} as any)
  }
}
