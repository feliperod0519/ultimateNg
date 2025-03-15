import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewChildren, output, viewChild } from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from "../../../shared/control/control.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent implements AfterViewInit, OnInit {

  //@ViewChild('form') form?: ElementRef<HTMLFormElement>;
  private form = viewChild<ElementRef<HTMLFormElement>>('form'); //will give a signal
  //@Output() add = new EventEmitter<{ title: string; text:string }>()
  add = output<{ title: string; text:string }>()

  enteredTitle = '';
  enteredText = '';

  onSubmit(){
    //(titleElement:HTMLInputElement,request:string){  if you are using attributes
    //form:HTMLFormElement){ if you're using #form
    
    //console.dir(titleElement)
    //const enteredTitle = titleElement.value;
    //console.log(enteredTitle);
    //console.log(request);
    //this.form?.nativeElement.reset();

    //this.add.emit({title:titleElement.value,text:request})
    this.add.emit({title:this.enteredTitle,text:this.enteredText})
    this.enteredText= ''
    this.enteredTitle=''
    //this.form()?.nativeElement.reset; //before 2-way values
    //form.reset()
  }

  ngAfterViewInit(): void {
    console.log('After view init'); //guarantees the template has been initialized so you have full access to viweChild
    console.log(this.form()?.nativeElement); //undefined if you use DECORATORs technique
  }

  ngOnInit(): void {
    console.log('On init');
    console.log(this.form()?.nativeElement);
  }
}
