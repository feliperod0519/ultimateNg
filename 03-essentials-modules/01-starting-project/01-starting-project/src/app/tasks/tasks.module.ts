import { NgModule } from "@angular/core";
import { TaskComponent } from "./task/task.component";
import { TasksComponent } from "./tasks.component";
import { NewTaskComponent } from "./new-task/new-task.component";
import { BrowserModule } from "@angular/platform-browser";
import { SharedModule } from "../shared/sared.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations:[ TaskComponent, TasksComponent, NewTaskComponent],
    exports: [TaskComponent, TasksComponent, NewTaskComponent],
    imports: [SharedModule, CommonModule, FormsModule] //BrowserModule can only be imported in root module, use CommonModule instead
})
export class TasksModule{

}