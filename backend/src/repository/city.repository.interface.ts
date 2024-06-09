import { PaginatedResponse } from '../response/paginated.response'
import { City } from '../entity/city.entity'
import { PageRequest } from '../request/page.request'
import { CitySearchRequest } from '../request/city.search.request'

export interface ICityRepository {
    getAll(
        citySearch?: CitySearchRequest,
        page?: PageRequest
    ): Promise<PaginatedResponse<City>>
}
