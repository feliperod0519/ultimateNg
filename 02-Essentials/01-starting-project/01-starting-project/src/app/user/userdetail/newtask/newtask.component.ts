import { Component, Output, EventEmitter, signal, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {type INewTaskData } from './new-task.model';
import { TasksService } from '../task.service';

@Component({
  selector: 'app-newtask',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './newtask.component.html',
  styleUrl: './newtask.component.css'
})
export class NewtaskComponent {
  
  @Output() closeDialog = new EventEmitter<void>()
  //@Output() add = new EventEmitter<INewTaskData>();

  @Input({required:true}) userId!: string;

  enteredTitle = signal('');
  enteredSummary = '';
  enteredDate = '';

  private tasksService = inject(TasksService);

  
  onCancelNewTask(){   
    this.closeDialog.emit();
  }

  onSubmit(){
    this.tasksService.addTask({
      title:this.enteredTitle(),
      summary:this.enteredSummary,
      date:this.enteredDate
      },this.userId);
    // this.add.emit({
    //   title:this.enteredTitle(),
    //   summary:this.enteredSummary,
    //   date:this.enteredDate
    // })
    this.closeDialog.emit();
  }
}
