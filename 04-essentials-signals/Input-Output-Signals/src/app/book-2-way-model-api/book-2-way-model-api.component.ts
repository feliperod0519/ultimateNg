import { Component, model } from '@angular/core';

import { Book } from '../book-component/book.model';

@Component({
  selector: 'app-book-2-way-model-api',
  standalone: true,
  imports: [],
  templateUrl: './book-2-way-model-api.component.html',
  styleUrl: './book-2-way-model-api.component.css'
})
export class Book2WayModelApiComponent {
  book = model<Book>();

  changeTitle(){
    this.book.update((book)=>{
      if (!book) return;
      book.title = "New Title";
      return book;
    })
  }
}

// So now, the book signal is a ModelSignal, instead of an InputSignal.
// So what's the difference?
// The main difference is that unlike with a normal input, the book input is now a writeable signal, as we can see on the changeTitle method.
