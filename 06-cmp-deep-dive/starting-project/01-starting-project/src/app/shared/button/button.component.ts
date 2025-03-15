import { Component } from '@angular/core';

@Component({
  selector: 'button[appButton], a[appButton]',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

}
//This means any element button w/appButton attribute should be controlled by this.
//or selector: 'button.button', means button with class button