import { Routes } from '@angular/router';
import { LoginComponent } from './autenticacion/logIn/login.component';
import { SandboxComponent } from './sandbox/sandbox.component';

export const appRoutes: Routes = [
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'sandbox', component: SandboxComponent
    },
]