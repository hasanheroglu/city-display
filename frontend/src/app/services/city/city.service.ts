import { Injectable } from '@angular/core'
import { City } from '../../model/city/city'
import { CitySearchRequest } from '../../model/request/city.search.request'
import { PageRequest } from '../../model/request/page.request'
import { PaginatedResponse } from '../../model/response/paginated.response'

@Injectable({
    providedIn: 'root',
})
export class CityService {
    async getAll(
        citySearch?: CitySearchRequest,
        page?: PageRequest
    ): Promise<PaginatedResponse<City> | undefined> {
        const baseURL = `${import.meta.env['NG_APP_CITY_BACKEND_API']}/cities?`
        const citySearchParam =
            citySearch && citySearch.name ? `&name=${citySearch.name}` : ''
        const pageParam = page ? `&pageNo=${page.no}&pageSize=${page.size}` : ''

        let res: Response

        try {
            res = await fetch(baseURL + citySearchParam + pageParam)

            if (res.ok) {
                return (await res.json()) ?? undefined
            }
        } catch (err) {
            console.error(err)
        }

        return undefined
    }
}
