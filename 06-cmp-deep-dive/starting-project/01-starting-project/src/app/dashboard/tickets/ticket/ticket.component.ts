import { Component, input, signal, output} from '@angular/core';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  data = input.required<Ticket>();
  detailsVisible = signal(false);
  close = output<void>()

  onToggleDetails(){
    //Either like this
    //this.detailsVisible.set(!this.detailsVisible());
    //Or
    console.log('hello')
    this.detailsVisible.update((wasVisible)=>!wasVisible)
  }
   
  onMarkAsCompleted(){
    this.close.emit()
  }
}
