import { Services } from "./services";

export interface Partners {
    id?:string;
    name:string;
    service: Services;
    street: string,
    number: number,
    city: string,
    state: string,
    lat?: number;
    lon?: number;
    email: string;
    phone: string;
    active: boolean;
}
