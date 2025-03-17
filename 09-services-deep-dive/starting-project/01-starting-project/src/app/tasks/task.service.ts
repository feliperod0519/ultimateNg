import { inject, Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";
import { LoggingService } from "../logging.service";

@Injectable({
    providedIn: 'root'
})
//let's provide in main.ts but the recommendation is providedin:root
//you can also use element injector. Check the provider for usage providers:[]
export class TaskService{

    private tasks = signal<Task[]>([]);
    private loggingService = inject(LoggingService);

    allTasks = this.tasks.asReadonly();

    addTask(taskData: {title:string,description:string}){
        const newTask: Task = {
            ...taskData,
            id: Math.random().toString(),
            status: 'OPEN'
        }
        this.tasks.update((oldTasks)=>{
            return [...oldTasks,newTask]
        });
        this.loggingService.log('Added task w/title ' + taskData.title)
    }

    updateTaskStatus(taskId:string, newStatus:TaskStatus){
        this.tasks.update((oldTasks)=>oldTasks.map((t)=>t.id === taskId?{...t, status: newStatus}:t));
        this.loggingService.log('Change task status to ' + newStatus);
    }

}