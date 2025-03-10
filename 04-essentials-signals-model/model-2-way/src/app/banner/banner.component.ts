import { Component,EventEmitter,model } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {
  expand = model.required<boolean>();

  doExpansionRetraction(){
    this.expand.set(!this.expand);
  }
}

//Equivalent to expand = model.required<boolean>();

//template:`<input ngModel [(ngModel)]="inputValue" >`

// export class BannerComponent {
//   @Input() expand = false;
//   @Output() expandChange = new EventEmitter<boolean>()

//   [Symbol]..
// }
