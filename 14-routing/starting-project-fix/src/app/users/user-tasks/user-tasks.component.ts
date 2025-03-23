import {
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  input,
} from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  // userId = input.required<string>();
  userName = '';
  private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  message = input.required<string>();

  userNameResolve = input.required<string>();

  // userName = computed(
  //   () => this.usersService.users.find((u) => u.id === this.userId())?.name
  // );

  ngOnInit(): void {
    console.log('snapshot',this.activatedRoute.snapshot);
    console.log('activated route', this.activatedRoute.paramMap);
    console.log('Input data',this.message())
    //The difference is the activatedRoute produces subjects while snapshot produces values
    //snapshot is used when you are 100% sure it won't need re-execution
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        this.userName =
          this.usersService.users.find((u) => u.id === paramMap.get('userId'))
            ?.name || '';
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}

export const resolveUserName : ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot)=>{
  const usersService = inject(UsersService);
  const userName = usersService.users.find((u)=>u.id === activatedRoute.paramMap.get('userId'))?.name || ''
  return userName;
}

export const resolveTitle: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot)=>{
  return resolveUserName(activatedRoute,routerState) + '\'s tasks'
}
