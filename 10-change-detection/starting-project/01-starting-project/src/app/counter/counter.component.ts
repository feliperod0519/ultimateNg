import { Component, OnInit, signal,inject, NgZone, ChangeDetectionStrategy } from '@angular/core';

import { InfoMessageComponent } from '../info-message/info-message.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  imports: [InfoMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush //Makes sense in big app and app not too connected
})
export class CounterComponent implements OnInit {
  private zone = inject(NgZone);
  count = signal(0);

  ngOnInit(): void {
    setTimeout(()=>{
      this.count.set(0);
    },4000);

    //opt-out Zone.js (ng's change detection)
    this.zone.runOutsideAngular(()=>{
      setTimeout(()=>{
        console.log('Timer expired!');
      },5000);  
    })
    // setTimeout(()=>{
    //   console.log('Timer expired!');
    // },5000);  
    //Los 2 timers generan que zone se ejecute 2 veces a pesar que el 2do timer no tiene nada que ver.
    //ngZone helps to avoid zone pollution
  }

  //Los 2 timers generan que zone se ejecute 2 veces a pesar que el 2do timer no tiene nada que ver.
  //ngZone

  get debugOutput() {
    console.log('[Counter] "debugOutput" binding re-evaluated.');
    return 'Counter Component Debug Output';
  }

  onDecrement() {
    this.count.update((prevCount) => prevCount - 1);
  }

  onIncrement() {
    this.count.update((prevCount) => prevCount + 1);
  }
}
