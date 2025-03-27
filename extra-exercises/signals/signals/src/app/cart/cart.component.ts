import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  items = [
    { name: 'Product A', price: 10 },
    { name: 'Product B', price: 15 },
    { name: 'Product C', price: 20 },
  ];
  itemList = signal(this.items);
  totalPrice = computed(()=>{
    return this.itemList().reduce((acc,i)=>acc+i.price,0);
  });
  
  removeItem(item:{name:string,price:number}|null){
    if (item){
      console.log('hello')
      this.itemList.set(this.itemList().filter((i)=>i!==item));
    }
  }

  constructor(){
  }
}
