import { Component, inject, input, computed, OnInit } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent],
})
export class TasksComponent implements OnInit {

  userId = input.required<string>();//won't work for child routes (input routing). Then to make it
  //work you need withRouterConfig and paramsInheritanceStrategy
  private tasksService = inject(TasksService);
  userTasks = computed(()=>this.tasksService.allTasks().filter((t)=>t.userId === this.userId()))
  
  ngOnInit(): void {
    console.log(this.userTasks())
  }
}
