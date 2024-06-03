import { City } from "../entity/city.entity";
import { ICityRepository } from "../repository/city.repository.interface";
import { CityRepositoryJSON } from "../repository/city.repository.json";
import { ICityService } from "./city.service.interface";

export class CityService implements ICityService {
    
    cityRepository: ICityRepository = new CityRepositoryJSON();

    getAll(): City[] {
        return this.cityRepository.getAll();
    }
    getById(id: number): City {
        return this.cityRepository.getById(id);
    }
    getByName(name: string): City {
        return this.cityRepository.getByName(name);
    }
}