import { Component, input, output, inject, DestroyRef } from '@angular/core';

import { Place } from './place.model';
import { PlacesService } from './places.service';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [],
  templateUrl: './places.component.html',
  styleUrl: './places.component.css',
})
export class PlacesComponent {
  places = input.required<Place[]>();
  selectPlace = output<Place>();
  placesService = inject(PlacesService)

  private destroyRef = inject(DestroyRef);

  onSelectPlace(place: Place) {
    this.selectPlace.emit(place);
    const subscription = this.placesService.removeUserPlace(place).subscribe({
      next: (resData) => console.log(resData)
    });
    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe()
    })
    
  }
}
