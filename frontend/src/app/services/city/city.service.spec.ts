import { TestBed } from '@angular/core/testing'

import { CityService } from './city.service'
import { City } from '../../model/city/city'
import { PaginatedResponse } from '../../model/response/paginated.response'

describe('CityService', () => {
    let service: CityService
    const city: City = {
        name: 'Sydney',
        name_native: 'Sydney',
        country: 'Australia',
        continent: 'Australia',
        latitude: -33.865143,
        longitude: 151.2099,
        population: 5312000,
        founded: 1788,
        landmarks: [
            'Sydney Opera House',
            'Sydney Harbour Bridge',
            'Queen Victoria Building',
        ],
    }

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(CityService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    describe('getAll', () => {
        it('should get 0 cities', async () => {
            const responseData: PaginatedResponse<City> = {
                data: [] as City[],
                current: { no: 1, size: 0 },
                pages: 0,
            }
            const fetchSpy = spyOn(window, 'fetch').and.resolveTo(
                new Response(
                    new Blob([JSON.stringify(responseData)], {
                        type: 'application/json',
                    })
                )
            )

            const res = await service.getAll()
            expect(res?.data.length).toEqual(0)
            expect(fetchSpy).toHaveBeenCalledTimes(1)
        })

        it('should get 1 city', async () => {
            const responseData: PaginatedResponse<City> = {
                data: [city],
                current: { no: 1, size: 1 },
                pages: 1,
            }
            const fetchSpy = spyOn(window, 'fetch').and.resolveTo(
                new Response(
                    new Blob([JSON.stringify(responseData)], {
                        type: 'application/json',
                    })
                )
            )

            const res = await service.getAll()
            expect(res?.data.length).toEqual(1)
            expect(res?.data[0].name).toEqual('Sydney')
            expect(fetchSpy).toHaveBeenCalledTimes(1)
        })

        it('should search with name param', async () => {
            const responseData: PaginatedResponse<City> = {
                data: [city],
                current: { no: 1, size: 1 },
                pages: 1,
            }

            const fetchSpy = spyOn(window, 'fetch').and.resolveTo(
                new Response(
                    new Blob([JSON.stringify(responseData)], {
                        type: 'application/json',
                    })
                )
            )

            const searchName = 'Syd'
            const res = await service.getAll({ name: searchName })

            expect(res?.data.length).toEqual(1)
            expect(res?.data[0].name).toEqual('Sydney')
            expect(fetchSpy).toHaveBeenCalledOnceWith(
                `${import.meta.env['NG_APP_CITY_BACKEND_API']}/cities?&name=${searchName}`
            )
        })

        it('should return undefined when response is not successful', async () => {
            const fetchSpy = spyOn(window, 'fetch').and.rejectWith()

            const res = await service.getAll()

            expect(res).toBeFalsy()
            expect(fetchSpy).toHaveBeenCalledTimes(1)
        })
    })
})
