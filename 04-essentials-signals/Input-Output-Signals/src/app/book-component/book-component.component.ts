import { Component, computed, input, effect, output } from '@angular/core';

import { Book } from './book.model';
import { outputToObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-book-component',
  standalone: true,
  imports: [],
  templateUrl: './book-component.component.html',
  styleUrl: './book-component.component.css'
})
export class BookComponentComponent {
  book = input.required({
    transform: (value: Book | null) => {
      if (!value) return null;
  
      value.title += " :TRANSFORMED";
  
      return value;
    },
  });
  bookLength = computed(()=>this.book()?.title.length);
  //Whenever the book input signal value changes, then the bookLength signal will also be recalculated.
  //   We could also apply an effect() on top of a book signal to monitor changes to it.
  // Remember, an input signal is just a read-only signal, there is nothing special about it. You can do with it all the usual operations that you can do with any other signal.

  deleteBook = output<Book>({ alias: "deleteBookOutput"});

  constructor(){
    effect(() => {
      console.log("Book changed: ", this.book());
    });
    this.deleteBookObservable$.subscribe((book: Book) => {
      console.log("Book emitted: ", book);
    });
  }

  //instead of
  // class BookComponent implements OnChanges {
  //   @Input() book: Book;
  
  //   ngOnChanges(changes: SimpleChanges) {
  //     if (changes[book]) {
  //       console.log("Book changed: ", 
  //          changes.book.currentValue);
  //     }
  //   }
  // }

  onDelete() {
    this.deleteBook.emit({
      title: "Angular Deep Dive",
      synopsis: "A deep dive into Angular core concepts",
    });
  }

  // As we can see, output() is not signal-based, it's just more type-safe than the traditional @Output() decorator.
  //But besides that, one of the advantages is that it provides a much better interoperability with RxJs.

  deleteBookObservable$ = outputToObservable(this.deleteBook);
}
