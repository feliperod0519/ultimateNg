import { Component, DestroyRef, OnInit, computed, effect, inject, signal } from '@angular/core';
import { interval, map, Observable } from 'rxjs'; 
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  private destroyRef = inject(DestroyRef)
  clickCount = signal(0);

  clickCount$ = toObservable(this.clickCount); //pass the unexecuted symbol to observable

  interval$ = interval(1000); //convert to signal
  intervalSignal = toSignal(this.interval$,{ initialValue: 0 }); //now you can use in effect or compute or event in interpolation (check template file)
  //if you use toSignal no clean up is necessary

  //for the click in signals
  // doubleInterval = (computed(()=>this.interval()*2))
  private customInterval$ = new Observable((subscriber)=>{
    let timesExecuted = 0;
    const interval = setInterval(()=>{
      if (timesExecuted > 3){
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      console.log('emiting new value');
      subscriber.next({ message: 'new value'});
      timesExecuted++;
    },2500)
  })

  constructor(){
    effect(()=>{
      console.log(`Clicked button ${this.clickCount()} times `)
    })

    //instead of using an effect to listen  (when you convert signal to Observable)
    //use the subscriber in ngOnlint
  }

  ngOnInit(): void {

    // setInterval(()=>{
    //   this.interval.update(pint=>pint+1)
    // })

    this.customInterval$.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('completed!')
    })

    const subscription = interval(1000).pipe(
      map((val)=>val*2)      
    ).subscribe({
      next: (val)=>console.log(val)
    })
    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe();
    })

    const subs2 =this.clickCount$.subscribe({
      next: (val) => console.log(`Clicked button ${this.clickCount()} times `)
    })
    this.destroyRef.onDestroy(()=>{
      subs2.unsubscribe();
    })
  }

  onClick(){
    this.clickCount.update(prevCount => prevCount + 1)
  }
}
