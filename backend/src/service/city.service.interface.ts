import { City } from "../entity/city.entity";

export interface ICityService {
    getAll(): City[];
    getById(id: number): City;
    getByName(name: string): City;
}