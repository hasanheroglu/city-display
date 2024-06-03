import { City } from '../entity/city.entity';
import citiesJSON from './cities.json';

export const CityList: City[] = citiesJSON.cities.map((c) => {
    return {
        name: c.name,
        name_native: c.name_native,
        country: c.country,
        continent: c.continent,
        latitude: parseFloat(c.latitude),
        longitude: parseFloat(c.longitude),
        population: parseInt(c.population),
        founded: parseInt(c.founded),
        landmarks: c.landmarks,
    } as City;
});