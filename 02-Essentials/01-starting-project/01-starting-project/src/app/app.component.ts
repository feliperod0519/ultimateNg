import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { UserComponent } from "./user/user.component";

import { DUMMY_USERS } from '../dummy-users';
import { UserdetailComponent } from "./user/userdetail/userdetail.component";
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, UserComponent, UserdetailComponent, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  users = DUMMY_USERS;
  private selectedName?:string;
  private selectedId?:string;

  get currentSelectedName(){
    return this.selectedName;
  }

  get currentUserId(){
    return this.selectedId;
  }

  onSelectUser(id:string){
    console.log('id:' + id);
    const u = this.users.find(u=>u.id===id)?.name 
    this.selectedName = u || '';
    const userId = this.users.find(u=>u.id===id)?.id 
    this.selectedId = userId
  }
}
