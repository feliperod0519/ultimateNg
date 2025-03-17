import { Component, ElementRef, viewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {

    private formEl = viewChild<ElementRef<HTMLFormElement>>('form');
    private taskService = inject(TaskService);

    //constructor(private tSetvice:TaskService){}

    onAddTask(title: string, description: string) {
      this.taskService.addTask({title,description}); //this.taskService.addTask({title:title,description:description});--> Equivalent
      this.formEl()?.nativeElement.reset();  
    }
}

