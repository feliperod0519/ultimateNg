import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { TableComponent } from './table/table.component';

export const routes: Routes = [
    {
        path: '',
        component: CartComponent
    },
    {
        path: 'cart',
        component: CartComponent
    },
    {
        path: 'table',
        component: TableComponent
    }
];
