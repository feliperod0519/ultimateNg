import { Component,input, output, Input, Output, EventEmitter, model } from '@angular/core';

@Component({
  selector: 'app-rect',
  standalone: true,
  imports: [],
  templateUrl: './rect.component.html',
  styleUrl: './rect.component.css',
})
export class RectComponent {
  // Todo: Implement custom two-way binding

  // size = input.required<{ width:string, height:string }>()
  // sizeChange = output<{ width:string, height:string }>(); //xxxChange is Mandatory

  // @Input({required:true})size!:{width:string, height:string};
  // @Output()sizeChange = new EventEmitter<{width:string, height:string}>(); //xxxChange is Mandatory

  size = model.required<{width:string, height:string}>();

  onReset() {
    this.size.set({width:'200', height:'100'})
    //this.sizeChange.emit({width:'200', height:'100'})
  }
}
