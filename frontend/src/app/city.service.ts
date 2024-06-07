import { Injectable } from '@angular/core';
import { City } from './city';
import { CitySearchRequest } from './city.search.request';
import { PageRequest } from './page.request';
import { PaginatedResponse } from './paginated.response';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor() { }

  async getAll(citySearch?: CitySearchRequest, page?: PageRequest): Promise<PaginatedResponse<City> | undefined> {
    const baseURL = "http://localhost:3000/api/v1/cities?"
    const citySearchParam = citySearch && citySearch.name ? `&name=${citySearch.name}` : "";
    const pageParam = page ? `&pageNo=${page.no}&pageSize=${page.size}` : "";

    const res: Response = await fetch(baseURL + citySearchParam + pageParam)

    if (res.ok) {
      return (await res.json()) ?? {};
    } else {
      console.error(res.status)
    }

    return undefined;
  }
}
