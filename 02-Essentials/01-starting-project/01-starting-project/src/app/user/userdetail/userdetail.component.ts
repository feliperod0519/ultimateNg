import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { TaskComponent } from "./task/task.component";
import { NewtaskComponent } from "./newtask/newtask.component";
import { type INewTaskData } from './newtask/new-task.model';
import { TasksService } from './task.service';

@Component({
  selector: 'app-userdetail',
  standalone: true,
  imports: [TaskComponent, NewtaskComponent],
  templateUrl: './userdetail.component.html',
  styleUrl: './userdetail.component.css'
})
export class UserdetailComponent {
  @Input({required:true}) userId!:string;
  name = input<string>();
  showNewTask:boolean = false;

  constructor(private tasksService: TasksService){}

  get selectedUserTasks(){
    return this.tasksService.getUserTasks(this.userId);
  }


  onAddTask(){
    this.showNewTask = true;
  }

  closeDialog(){
    this.showNewTask = false;
  }

  // onAddNewTask(taskData:INewTaskData){
    
  //   this.showNewTask = false;
  // }
}
