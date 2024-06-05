import { Component, inject } from '@angular/core';
import { CityCardComponent } from '../city-card/city-card.component';
import { City } from '../city';
import { CityService } from '../city.service';
import { CommonModule } from '@angular/common';
import { MapService } from '../map.service';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [CityCardComponent, CommonModule],
  templateUrl: './city.component.html',
  styleUrl: './city.component.scss'
})

export class CityComponent {

  cityService: CityService = inject(CityService);
  mapService: MapService
  cityList: City[] = [];

  constructor() {
    this.cityService.getAll().then((res) => {
      this.cityList = res;
    })
    this.mapService = inject(MapService)
  }

  ngOnInit() {
    this.mapService.loadGlobe();
  }
}
