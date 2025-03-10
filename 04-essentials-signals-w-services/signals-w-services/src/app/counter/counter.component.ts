import { Component } from '@angular/core';
import { CounterServiceService } from '../counter-service.service';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  constructor(public counterService: CounterServiceService) {}
}
