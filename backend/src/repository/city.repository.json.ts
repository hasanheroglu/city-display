import { CityList } from "../data/data";
import { City } from "../entity/city.entity";
import { ICityRepository } from "./city.repository.interface";
export class CityRepositoryJSON implements ICityRepository {
    getAll(): City[] {
        return CityList;
    }
    getById(id: number): City {
        return CityList[id];
    }
    getByName(name: string): City {
        return CityList.filter((c) => name === c.name)[0];
    }
}