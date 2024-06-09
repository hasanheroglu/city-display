import { Component, AfterViewInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import * as L from 'leaflet';
import { City } from '../city';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { CommonModule } from '@angular/common';

const iconRetinaUrl: string = 'marker-icon-2x.png';
const iconUrl: string = 'marker-icon.png';
const shadowUrl: string = 'marker-shadow.png';
const iconDefault: L.Icon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

const redCircleIcon: L.Icon = L.icon({
  iconUrl: 'red-circle.svg',
  iconSize:     [30, 30],
  iconAnchor:   [15, 15], 
  popupAnchor:  [0, -12]
});

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnChanges, AfterViewInit {
  @Input() city?: City;
  
  mapProvider: OpenStreetMapProvider = new OpenStreetMapProvider();
  map: L.Map | undefined;
  markers: L.Marker[];
  isMapLoading: boolean;

  constructor() {
    this.markers = [];
    this.isMapLoading = false;
  }
  
  initMap(): void {
    this.map = L.map('map', {
      center: [ 48.14153366463452, 11.567955852674897 ],
      zoom: 13,
      zoomControl: false
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    this.map?.stop();
    if (this.city) {
      this.isMapLoading = true;
    }

    this.removeMarkers();

    if (this.map && this.city) {
      const cityMarker = this.addCityMarker();
      await this.addLandmarkMarkers();

      this.isMapLoading = false;
      this.map?.flyTo([this.city.latitude, this.city.longitude], 13, { animate: true, duration: 3});
      
      if (cityMarker) {
        cityMarker.openPopup();
      }
    }
  }

  removeMarkers() {
    if (this.map && this.markers.length > 0) {
      for (const marker of this.markers) {
        this.map.removeLayer(marker);
      }
      this.markers.length = 0;
    }
  }

  addCityMarker(): L.Marker {
    const cityMarker = L.marker([this.city!.latitude, this.city!.longitude], { icon: redCircleIcon })
        .bindPopup(`
          <div> Continent: ${this.city!.continent} </div>
          <div> Country: ${this.city!.country} </div>
          <div> Founded: ${this.city!.founded} </div>
          <div> Population: ${this.city!.population} </div>
          <div> Landmarks: ${this.city!.landmarks.toString().replaceAll(',', ', ')} </div>
        `)
        .addTo(this.map!);
      this.markers?.push(cityMarker);

      return cityMarker;
  }

  async addLandmarkMarkers() {
    for (const landmark of this.city!.landmarks) {
      const results = await this.mapProvider.search({ query: `${landmark}, ${this.city!.name_native}` });
      
      if (results.length > 0) { 
        const landmarkMarker = L.marker([results[0].y, results[0].x])
          .bindPopup(`
            <div> 
              <p>${landmark}</p>
            </div>
          `)
          .addTo(this.map!);
        this.markers.push(landmarkMarker);
      }
    }
  }

  ngAfterViewInit(): void {
    this.initMap()
  }
}
