import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';

import { TasksComponent } from './tasks/tasks.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { resolveTitle, resolveUserName, UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { NotFoundComponent } from './not-found/not-found.component';

import {routes as userRoutes} from './users/users.routes'
import { inject } from '@angular/core';


const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router)
  const shouldGetAccess = Math.random()
  if (shouldGetAccess < 0.5){
    return true;
  }
  return new RedirectCommand(router.parseUrl('/unauthorized'))
}

export const routes: Routes = [
  {
    path: '', // <your-domain>/
    component: NoTaskComponent,
    // redirectTo: '/users/u1',
    // pathMatch: 'full',
    title: 'No tasks selected'
  },
  {
    path: 'users/:userId', // <your-domain>/users/<uid>
    component: UserTasksComponent,
    data: { message: 'Hello'},
    resolve : {
      //add a function resolver
      userNameResolve: resolveUserName
    },
    children: userRoutes,
    title: resolveTitle,
    canMatch: [dummyCanMatch]
    // [
    //   {
    //     path: '',
    //     redirectTo: 'tasks',
    //     pathMatch: 'full'
    //   },
    //   {
    //     path: 'tasks', // <your-domain>/users/<uid>/tasks
    //     component: TasksComponent,
    //   },
    //   {
    //     path: 'tasks/new',
    //     component: NewTaskComponent,
    //   },
    // ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
