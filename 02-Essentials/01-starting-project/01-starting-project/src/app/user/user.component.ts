import { Component, computed, EventEmitter, Input, input, Output, output } from '@angular/core';

import { type User } from './user.model';

//type User ={id:string,name:string,avatar:string}

import { CardComponent } from '../shared/card/card.component';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  @Input({required:true}) avatar!: string;
  @Input({required:true}) name!: string;
  // avatar = input.required<string>();
  // name = input.required<string>();
  @Input({required:true}) id!:string;

  @Input({required:true}) user!: User
  @Input({required:true}) selected!: boolean;

  @Output() select = new EventEmitter<string>();
  //select = output<string>();

  // imagePath = computed(()=>{
  //   return 'assets/users/' + this.avatar();
  // })

  get imagePath(){
     //return 'assets/users/' + this.avatar;
     return 'assets/users/' + this.user?.avatar;
  }

  onSelectUser(){
    //this.select.emit(this.id)
    this.select.emit(this.user?.id);
  }

}
