import { Component, computed, DestroyRef, inject, OnInit, signal, effect, afterNextRender } from '@angular/core';
import { PlacesService } from '../services/places.service';
import { Place } from '../models/place.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {

  loading = signal(true);
  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);
  places = signal<Place[]>([]);

  private firstName = signal('Minou');
  private lastName = signal('The Cat');
  private age = signal(2);

  isLoading(){
    return this.loading();
  }


  ngOnInit(): void {
    
    // effect(()=>{
    //     console.log('Full Name',fullName);
    //     console.log('Is Adult',isAdult)
    // });

    let fullName = computed(()=>`${this.firstName()} ${this.lastName()}`);
    let isAdult = computed(()=>this.age()>=18);

    
    const subscription =this.placesService.loadAvailablePlaces().subscribe({
      next: (places) =>{
        this.places.set(places);
      },
      error: (error: Error) => {
        console.log(error.message);
      },
      complete: () => {
        this.loading.set(false);
      }
    });
    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe();
    });



    this.firstName.set('Kitty');
    this.lastName.set('Le Chat');
    this.age.set(3);
  }
}
