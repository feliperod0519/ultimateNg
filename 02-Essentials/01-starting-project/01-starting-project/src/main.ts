import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
//import { HeaderComponent } from './app/header.component';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
//bootstrapApplication(HeaderComponent);
//not typical
//just a test