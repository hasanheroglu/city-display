import { Component, Input, inject } from '@angular/core';
import { City } from '../city';
import { MapService } from '../map.service';

@Component({
  selector: 'app-city-card',
  standalone: true,
  imports: [],
  templateUrl: './city-card.component.html',
  styleUrl: './city-card.component.scss'
})
export class CityCardComponent {
  @Input() city!: City;

  mapService: MapService = inject(MapService);

  changeGlobePOV(lat: number, lon: number, ms: number) {
    this.mapService.changePOV(lat, lon, ms);
  }
}
