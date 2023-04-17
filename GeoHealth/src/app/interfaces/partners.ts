import { GeoPoint } from "@angular/fire/firestore";

export interface Partners {
    id?:string;
    name:string;
    service: [];
    street: string,
    number: number,
    city: string,
    state: string,
    geo: GeoPoint
    email: string;
    phone: string;
    active: boolean;
}
