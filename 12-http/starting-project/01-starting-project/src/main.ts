import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app/app.component';


bootstrapApplication(AppComponent, {
                                    providers: [provideHttpClient()]
                                   }).catch((err) => console.error(err));

//If module

//    import { NgModule } from '@angular/core';
//    import { provideHttpClient } from '@angular/common/http';
                                    
//    @NgModule({
//      declarations: [
//        AppComponent,
//        PlacesComponent,
//        // ... etc
//      ],
//      imports: [BrowserModule, FormsModule],
//      providers: [provideHttpClient()],
//      bootstrap: [AppComponent],
//    })
//    export class AppModule {}