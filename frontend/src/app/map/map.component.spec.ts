import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { SimpleChange } from '@angular/core';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let mapProviderSpyObj: jasmine.SpyObj<OpenStreetMapProvider>;
  const city = {
    "name": "Sydney",
    "name_native": "Sydney",
    "country": "Australia",
    "continent": "Australia",
    "latitude": -33.865143,
    "longitude": 151.209900,
    "population": 5312000,
    "founded": 1788,
    "landmarks": [
      "Sydney Opera House",
      "Sydney Harbour Bridge",
      "Queen Victoria Building"
    ]
  };

  beforeEach(async () => {
    mapProviderSpyObj = jasmine.createSpyObj("MapProvider", ['search']);
    mapProviderSpyObj.search.and.resolveTo([
      { 
        x: 0, 
        y: 0, 
        label: "", 
        bounds: [[0, 0], [0, 0]], 
        raw: { place_id: "", licence: "", osm_id: 0, osm_type: "", boundingbox: ["", "", "", ""], lat: "", lon: "", display_name: "", class: "", type: "", importance: 0} 
      }
    ]);

    await TestBed.configureTestingModule({
      imports: [MapComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    component.mapProvider = mapProviderSpyObj;
    fixture.detectChanges();
  });

  it('should create and initialize map with coordinates, zoom and zoom control', () => {
    const lat = 48.14153366463452;
    const lon = 11.567955852674897;

    expect(component).toBeTruthy();
    expect(component.map).toBeTruthy();
    expect(component.map?.getMinZoom()).toBe(3);
    expect(component.map?.getMaxZoom()).toBe(18);
    expect(component.map?.getCenter().lat).toBe(lat);
    expect(component.map?.getCenter().lng).toBe(lon);
    expect(component.map?.getZoom()).toBe(13);
  });

  describe("on city change", () => {
    it("should add city marker and landmark markers", async () => {
      component.city = city;
      await component.ngOnChanges({
        city: new SimpleChange(null, city, false)
      });
      fixture.detectChanges();

      city.landmarks.forEach(l => { 
        expect(mapProviderSpyObj.search).toHaveBeenCalledWith({ query: `${l}, ${city.name_native}`}); 
      });
      expect(mapProviderSpyObj.search).toHaveBeenCalledTimes(3);
    });
    
    it("should add city marker, landmark markers and remove existing markers on demand", async () => {
      component.city = city;
      await component.ngOnChanges({
        city: new SimpleChange(null, city, false)
      });
      fixture.detectChanges();

      expect(component.markers.length).toBe(4);
      city.landmarks.forEach(l => { 
        expect(mapProviderSpyObj.search).toHaveBeenCalledWith({ query: `${l}, ${city.name_native}`}); 
      });

      component.removeMarkers();
      fixture.detectChanges();

      expect(component.markers.length).toBe(0);
    });
  })

});
