import { PaginatedResponse } from "../response/paginated.response";
import { City } from "../entity/city.entity";
import { ICityRepository } from "../repository/city.repository.interface";
import { CityRepositoryMongo } from "../repository/city.repository.mongo";
import { PageRequest } from "../request/page.request";
import { ICityService } from "./city.service.interface";
import { CitySearchRequest } from "../request/city.search.request";

export class CityService implements ICityService {
    
    cityRepository: ICityRepository = new CityRepositoryMongo();

    async getAll(citySearch?: CitySearchRequest, page?: PageRequest): Promise<PaginatedResponse<City>> {
        return await this.cityRepository.getAll(citySearch, page);
    }
}