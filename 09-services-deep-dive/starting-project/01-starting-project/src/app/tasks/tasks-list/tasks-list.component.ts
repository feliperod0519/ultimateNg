import { Component, inject, signal, computed } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  private taskService = inject(TaskService);
  private selectedFilter = signal<string>('all');
  
  tasks = computed(()=> {
    switch(this.selectedFilter()){
      case 'all':
        return this.taskService.allTasks();
      case 'open':
        return this.taskService.allTasks().filter(t=>t.status==='OPEN');
      case 'in-progress':
        return this.taskService.allTasks().filter(t=>t.status==='IN_PROGRESS');
      case 'done':
        return this.taskService.allTasks().filter(t=>t.status==='DONE');
      default:
        return this.taskService.allTasks();
    }
  })

  //tasks are depending from a selectedFilter which it is a signal. selectedFilter has been modified. Tasks is a signal.
  
  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
