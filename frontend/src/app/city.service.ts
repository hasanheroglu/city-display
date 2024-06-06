import { Injectable } from '@angular/core';
import { City } from './city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor() { }

  async getAll(): Promise<City[]> {
    const res: Response = await fetch("http://localhost:3000/api/v1/cities")

    if (res.ok) {
      return (await res.json()) ?? [];
    } else {
      console.error(res.status)
    }

    return [];
  }
}
