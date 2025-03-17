import { bootstrapApplication, platformBrowser } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { TaskService } from './app/tasks/task.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


// bootstrapApplication(AppComponent,{
//     providers: [TaskService]
// }).catch((err) => console.error(err));

bootstrapApplication(AppComponent).catch((err) => console.error(err));

//platformBrowserDynamic().bootstrapModule(AppModule)

// in App.Module if exists

//@NgModule{....providers: [{provide:TaskServiceToken, useClass:TaskService}]}
