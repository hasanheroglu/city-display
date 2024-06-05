import { Injectable } from '@angular/core';
import Globe, { GlobeInstance } from 'globe.gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  globe: GlobeInstance | undefined

  constructor() {
    
  }

  loadGlobe() {
    const element = document.getElementById('map-canvas-container');
    this.globe = Globe({ animateIn: false, waitForGlobeReady: true })
      .width(600)
      .height(600)
      .globeImageUrl('earth.jpeg')
      .backgroundColor('#FFFFFF');

    if (element) {
      this.globe(element);
      console.log(this.globe)
    }
  }

  changePOV(lat: number, lon: number, ms: number) {
    this.globe?.pointOfView({ lat: lat, lng: lon }, ms)
  }
}
