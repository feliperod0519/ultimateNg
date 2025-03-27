import { HttpClient } from '@angular/common/http';
import { inject, Injectable,signal } from '@angular/core';
import { catchError, map, tap, throwError } from 'rxjs';

import { Place } from '../models/place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private httpClient = inject(HttpClient);
  private places = signal<Place[]>([]);

  constructor() { }

  loadAvailablePlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/places',
      'Something went wrong fetching the available places. Please try again later.'
    );
  }

  private fetchPlaces(url:string, errorMessage:string){
    return this.httpClient.get<{places:Place[]}>(url).pipe(
      map((resData) => resData.places),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(errorMessage));
      })      
    )
  }
}
