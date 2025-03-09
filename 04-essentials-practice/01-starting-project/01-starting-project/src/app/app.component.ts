import { Component,signal } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { UserInputComponent } from "./user-input/user-input.component";
import { type IInvestmentParameters } from './models/investmentParameters.model';
import { InvestmentResultsComponent } from "./investment-results/investment-results.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, UserInputComponent, InvestmentResultsComponent],
})
export class AppComponent {

  resultsData? : {
                  year: number,
                  interest: number,
                  valueEndOfYear: number,
                  annualInvestment: number,
                  totalInterest: number,
                  totalAmountInvested: number,
                }[];
  resultsDataSignal = signal<{
                              year: number,
                              interest: number,
                              valueEndOfYear: number,
                              annualInvestment: number,
                              totalInterest: number,
                              totalAmountInvested: number,
                            }[] | undefined>(undefined);

  calculateInvestmentResults(
    data:IInvestmentParameters) 
  {
    const annualData = [];
    const {initialInvestment,duration,expectedReturn,annualInvestment} = data;
    let investmentValue = initialInvestment;
  
    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }
  
    this.resultsData = annualData;
    this.resultsDataSignal.set(annualData); 
    console.log('resultsData',this.resultsData)
    console.log('resultsDataSignal',this.resultsDataSignal);
  }

}
