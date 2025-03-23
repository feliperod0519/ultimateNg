import { Routes } from "@angular/router";
import { TaskComponent } from "./tasks/task/task.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";

export const routes: Routes = [
    {
        path: '',
        component: NoTaskComponent
    },
    {
      path: 'users/:userId', //your-domain/users/<uid>
      component: UserTasksComponent,
      children: [
        {
          path: 'tasks', //your-domain/users/<uid>/tasks
          component: TaskComponent
        },
        {
          path: 'tasks/new',
          component: NewTaskComponent
        }
      ]
    }
]