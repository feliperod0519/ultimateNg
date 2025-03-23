import { ResolveFn, Routes } from '@angular/router';

import { TasksComponent } from '../tasks/tasks.component';
import { NewTaskComponent, canLeaveEditPage } from '../tasks/new-task/new-task.component';
import { Task } from '../tasks/task/task.model';
import { TasksService } from '../tasks/tasks.service';
import { inject } from '@angular/core';

const resolveUserTasks: ResolveFn<Task[]> = (
  activatedRouteSnapshot,
  routerState
) => {
  const order = activatedRouteSnapshot.queryParams['order'];
  const tasksService = inject(TasksService);
  const tasks = tasksService
    .allTasks()
    .filter(
      (task) => task.userId === activatedRouteSnapshot.paramMap.get('userId')
    );

  if (order && order === 'asc') {
    tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else {
    tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
  }

  return tasks.length ? tasks : [];
};

export const routes: Routes = [
  {
    path: '',
    providers: [TasksService],
    children: 
    [
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
      {
        path: 'tasks', // <your-domain>/users/<uid>/tasks
        component: TasksComponent,
        //same import baur the one at the beginning of the file is eager loading while calling import is lazy-loading
        //loadComponent: () => import('../tasks/tasks.component').then(mod=>mod.TasksComponent),
        //makes sense no more because it's loaded as children at the root routing code
        runGuardsAndResolvers: 'always',
        resolve: {
          userTasks: resolveUserTasks,
        },
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate: [canLeaveEditPage]
      },
    ]
  },  
  
];
