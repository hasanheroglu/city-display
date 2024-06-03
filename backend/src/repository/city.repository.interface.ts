import { City } from "../entity/city.entity";

export interface ICityRepository {
    getAll(): City[];
    getById(id: number): City;
    getByName(name: string): City;
}