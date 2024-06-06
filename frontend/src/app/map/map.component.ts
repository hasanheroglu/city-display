import { Component, AfterViewInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import * as L from 'leaflet';
import { City } from '../city';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { CommonModule } from '@angular/common';

const iconRetinaUrl = 'marker-icon-2x.png';
const iconUrl = 'marker-icon.png';
const shadowUrl = 'marker-shadow.png';
const iconDefault = L.icon({
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
  iconSize:     [30, 30], // size of the icon
  iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
  popupAnchor:  [0, -12] // point from which the popup should open relative to the iconAnchor
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

  private map: L.Map | undefined;
  private mapProvider: OpenStreetMapProvider = new OpenStreetMapProvider();
  private markers: L.Marker[] = [];
  
  isMapLoading: boolean = false;

  constructor() {}
  
  private initMap(): void {
    this.map = L.map('map', {
      center: [ 0, 0 ],
      zoom: 10,
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

    if (this.map && this.markers.length > 0) {
      for (const marker of this.markers) {
        this.map.removeLayer(marker);
      }
    }

    if (this.map && this.city) {
      const cityMarker = L.marker([this.city.latitude, this.city.longitude], { icon: redCircleIcon })
        .bindPopup(`
          <div> Continent: ${this.city.continent} </div>
          <div> Country: ${this.city.country} </div>
          <div> Founded: ${this.city.founded} </div>
          <div> Population: ${this.city.population} </div>
          <div> Landmarks: ${this.city.landmarks} </div>
        `)
        .addTo(this.map);
        


      for (const landmark of this.city.landmarks) {
        const results = await this.mapProvider.search({ query: `${landmark}, ${this.city.name_native}` })

        if (results.length > 0) { 
          const landmarkMarker = L.marker([results[0].y, results[0].x])
            .bindPopup(`
              <div> ${landmark} </div>
            `)
            .addTo(this.map);
          this.markers.push(landmarkMarker);
        }
      }

      this.isMapLoading = false;
      this.markers?.push(cityMarker);
      this.map?.flyTo([this.city.latitude, this.city.longitude], 13, { animate: true, duration: 3});
      cityMarker.openPopup();

    }
  }

  ngAfterViewInit(): void {
    this.initMap()
  }
}
