import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

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


}
