import { City } from "../entity/city.entity";
import { ICityRepository } from "./city.repository.interface";

export class CityRepositoryJSON implements ICityRepository {
    getAll(): City[] {
        throw new Error("Method not implemented.");
    }
    getById(id: number): City {
        throw new Error("Method not implemented.");
    }
    getByName(name: string): City {
        throw new Error("Method not implemented.");
    }
}