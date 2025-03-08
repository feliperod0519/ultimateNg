import { Component, Input, Output, EventEmitter, inject } from '@angular/core';

import { type ITask } from './ITask.model';
import { CardComponent } from "../../../shared/card/card.component";
import { DatePipe } from '@angular/common';
import { TasksService } from '../task.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CardComponent, DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input({required:true}) task!: ITask;
  //@Output() complete = new EventEmitter<string>();

  private taskService = inject(TasksService);

  onCompleteTask(){
    //this.complete.emit(this.task.id);
    this.taskService.removeTask(this.task.id);
  }
}
