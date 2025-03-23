import { Component, inject, input, computed, OnInit, DestroyRef } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet,RouterLink]
})
export class UserTasksComponent implements OnInit {
  userId = input.required<string>()
  private usersService = inject(UsersService);
  //alternative way
  private activatedRoute = inject(ActivatedRoute)

  userName = computed(()=> this.usersService.users.find(u=>u.id === this.userId())?.name)
  userName2? = ''

  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    console.log(this.activatedRoute);
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        this.userName2 = this.usersService.users.find((u)=>u.id === paramMap.get('userId'))?.name || '';
      } 
    });
    this.destroyRef.onDestroy(()=>subscription.unsubscribe());
  }
}
