import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GmapsService {


  private API_KEY = environment.mapKey

  constructor( private http: HttpClient ) { }


  getCoordFromAddress(address:string){
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.API_KEY}`;
    return this.http.get(url);

  }

  getStateFromLatLng(lat: number, lng: number) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.API_KEY}`;

    return this.http.get(url).pipe(
      map((response: any) => {
        const address_components = response.results[0].address_components;
        let state = '';

        for (let i = 0; i < address_components.length; i++) {
          const component = address_components[i];
          if (component.types.includes('administrative_area_level_1')) {
            state = component.long_name;
            break;
          }
        }

        return state;
      })
    );
    
  }


}
