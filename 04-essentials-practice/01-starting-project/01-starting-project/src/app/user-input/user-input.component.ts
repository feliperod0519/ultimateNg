import { Component, Output, EventEmitter, signal, Input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type IInvestmentParameters } from '../models/investmentParameters.model';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  
  @Output() calculate = new EventEmitter<IInvestmentParameters>();
  initialInvestment = signal('0');
  annualInvestment = signal('0');
  expectedReturn = signal('5');
  duration = signal('10');
  calculateWithSignals = output<IInvestmentParameters>();

  @Input()withSignals = true;

  onSubmit(){
    if (this.withSignals){
      this.calculate.emit({
                            initialInvestment:+this.initialInvestment(),
                            duration: +this.duration(),
                            expectedReturn:+this.expectedReturn(),
                            annualInvestment:+this.annualInvestment()
                          } as IInvestmentParameters)
    }
    else{
      this.calculate.emit({
        initialInvestment:+this.initialInvestment,
        duration: +this.duration,
        expectedReturn:+this.expectedReturn,
        annualInvestment:+this.annualInvestment
      } as IInvestmentParameters)
    }
  }
}
