import { TestBed } from '@angular/core/testing';

import { CityService } from './city.service';
import { City } from './city';

describe('CityService', () => {
  let service: CityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get 0 cities', async () => {
    const responseData: City[] = []
    const fetchSpy = spyOn(window, 'fetch')
      .and.resolveTo(new Response(new Blob([JSON.stringify(responseData)], { type: 'application/json' })));
    
    const res = await service.getAll();
    expect(res.length).toEqual(0);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('should get 1 city', async () => {
    const responseData: City[] = [{
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
    }]
    const fetchSpy = spyOn(window, 'fetch')
      .and.resolveTo(new Response(new Blob([JSON.stringify(responseData)], { type: 'application/json' })));
    
    const res = await service.getAll();
    expect(res.length).toEqual(1);
    expect(res[0].name).toEqual('Sydney');
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
 