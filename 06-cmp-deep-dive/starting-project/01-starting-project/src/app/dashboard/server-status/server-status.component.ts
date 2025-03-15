import { Component, DestroyRef, OnDestroy, OnInit, effect, inject, signal } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit, OnDestroy{
  //currentStatus: 'online' | 'offline' | 'unknown' = 'offline';
  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');
  private interval?: ReturnType<typeof setInterval>; //NodeJS.Timeout; <--- sometimes it doesn't work so replace it by ReturnType ...

  private destroyRef = inject(DestroyRef);

  constructor(){
    effect(()=>{
      console.log(this.currentStatus());
    })
    //it is here because it is not a subscription right away...
  }

  ngOnInit(): void {
    // this.interval = setInterval(()=>{
    //   const rnd = Math.random();
    //   if (rnd<0.5){
    //     this.currentStatus = 'online'
    //   }
    //   else if (rnd < 0.9){
    //     this.currentStatus = 'offline'
    //   }
    //   else{
    //     this.currentStatus = 'unknown'
    //   }
    // },5000);
    const interval = setInterval(()=>{
      const rnd = Math.random();
      if (rnd<0.5){
        //this.currentStatus = 'online'
        this.currentStatus.set('online')
      }
      else if (rnd < 0.9){
        this.currentStatus.set('offline')
      }
      else{
        this.currentStatus.set('unknown');
      }
    },5000);
    this.destroyRef.onDestroy(()=>{
      clearInterval(interval)
    })
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

 
}
