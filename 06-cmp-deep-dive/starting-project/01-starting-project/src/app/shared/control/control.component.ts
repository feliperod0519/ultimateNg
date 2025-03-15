import { Component, ElementRef, HostBinding, HostListener, input, ViewEncapsulation, inject, ContentChild, contentChild, AfterContentInit, afterRender, afterNextRender } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)':'onClick()'
  }
})
export class ControlComponent implements AfterContentInit {
  //@HostBinding('class') className = 'control'; //it's now discourage use host property in conf instead
  //@HostListener('click')= onClick(){console.log('Clicked!')}
  label = input.required<string>()
  //@ContentChild('input') private control?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;//go where it is used. For example in new-ticket
  private control = contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input')

  private el = inject(ElementRef);

  constructor(){
    afterRender(()=>{
      console.log('afterRender')
    });
    //Changes any where in the app
    afterNextRender(()=>{
      console.log('afterNextRender');
    });
    //next set of changes
  }

  onClick(){
    console.log('Clicked!');
    console.dir(this.el);
    console.log('control:', this.control);
  }

  ngAfterContentInit(): void {
    console.log('AfterContent Init')
    console.log(this.control);
  }
}

//host will add class=control to any app-control