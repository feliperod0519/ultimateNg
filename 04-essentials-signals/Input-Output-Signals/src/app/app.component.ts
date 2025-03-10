import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookComponentComponent } from "./book-component/book-component.component";
import { Book } from './book-component/book.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BookComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Input-Output-Signals';
  aBook = {
    title: "Angular Core Deep Dive",
    synopsis: "A deep dive into Angular core concepts",
  };

  deleteBookEvent(book: Book) {
    console.log('bookInApp',book);
   }
}
