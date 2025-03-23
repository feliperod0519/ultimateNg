import { Component } from '@angular/core';
import { interval, merge, from, of, Observable, Subject} from 'rxjs';
import { take,map,switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-sandbox',
  standalone: true,
  imports: [],
  templateUrl: './sandbox.component.html',
  styleUrl: './sandbox.component.css'
})
export class SandboxComponent {
  
  constructor(){
    console.log('Sandbox')
    //this.mergeEx();
    //this.mapEx();
    //this.switchMapEx_1()
    this.subjectEx();
  }

  mergeEx(){
    console.log('B mergeEx');
    const timer1$ = interval(1000).pipe(take(10));
    //timer1$.subscribe(i=>console.log('timer-1', i));
    const timer2$ = interval(2000).pipe(take(6));
    //timer2$.subscribe(i=>console.log('timer-2', i));
    const timer3$ = interval(500).pipe(take(10));
    //timer3$.subscribe(i=>console.log('timer-3', i));
    const merged$ = merge(timer1$,timer2$,timer3$,2);
    merged$.subscribe(i=>console.log('merged',i))
    console.log('E mergeEx');
  }

  mapEx(){
    console.log('B mapEx');
    const source$ = from([1,2,3,4,5,6,7,8,9,10])
    source$.pipe(map(x=>x+1)).subscribe(x=>console.log(x))
    console.log('E mapEx');
  }

  switchMapEx_1(){
    console.log('B SwitchMap-1');
    let innerMapCreator: Function;
    innerMapCreator= function(i:any,j:any):Observable<any>{
      return of(i,i**2,i**3)
    }
    const switched$ = of(1,2,3).pipe(switchMap(i=>of(i,i**2,i**3)));
    switched$.subscribe(x=>console.log(x))
    console.log('E SwitchMap-1');
  }

  subjectEx(){
    const subject = new Subject<number>();
    subject.subscribe({next:(v)=>console.log('subscription1',v)});
    subject.subscribe({next:(v)=>console.log('subscription2',v)});
    subject.next(1);
    subject.next(2);
    subject.next(3);
  }
}
