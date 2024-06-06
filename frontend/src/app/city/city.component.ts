import { Component, inject } from '@angular/core';
import { CityCardComponent } from '../city-card/city-card.component';
import { City } from '../city';
import { CityService } from '../city.service';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [CityCardComponent, MapComponent, CommonModule],
  templateUrl: './city.component.html',
  styleUrl: './city.component.scss'
})

export class CityComponent {
  cityService: CityService = inject(CityService);
  selectedCity: City | undefined;
  cityList: City[] = [];

  constructor() {
    this.cityService.getAll().then((res) => {
      this.cityList = res;
    })
  }

  setSelectedCity(city: City) {
    this.selectedCity = city;
  }
}
