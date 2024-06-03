import { CityRepositoryJSON } from "../repository/city.repository.json";
export class CityService {
    constructor() {
        this.cityRepository = new CityRepositoryJSON();
    }
    getAll() {
        return this.cityRepository.getAll();
    }
    getById(id) {
        return this.cityRepository.getById(id);
    }
    getByName(name) {
        return this.cityRepository.getByName(name);
    }
}
