import { ICityService } from '../src/service/city.service.interface'
import { CityService } from '../src/service/city.service.implementation'
import { City } from '../src/entity/city.entity'
import { PaginatedResponse } from '../src/response/paginated.response'
import mongoose from 'mongoose'

const cityService: ICityService = new CityService()

afterAll(() => {
    mongoose.connection.close()
})

describe('city service', () => {
    it('should get all cities', async () => {
        const result: PaginatedResponse<City> = await cityService.getAll()

        expect(result.data.length).toBe(8)
        expect(result.pages).toBe(1)
        expect(result.current).toMatchObject({ no: 1, size: 8 })
        expect(result.prev).toBeUndefined()
        expect(result.next).toBeUndefined()
    })

    it('should get cities with page no 1 and size 4', async () => {
        const result: PaginatedResponse<City> = await cityService.getAll(
            {},
            { no: 1, size: 4 }
        )

        expect(result.data.length).toBe(4)
        expect(result.pages).toBe(2)
        expect(result.prev).toBeUndefined()
        expect(result.next).toMatchObject({ no: 2, size: 4 })
    })

    it('should get cities with page no 2 and size 4', async () => {
        const result: PaginatedResponse<City> = await cityService.getAll(
            {},
            { no: 2, size: 4 }
        )

        expect(result.data.length).toBe(4)
        expect(result.pages).toBe(2)
        expect(result.prev).toMatchObject({ no: 1, size: 4 })
        expect(result.next).toBeUndefined()
    })

    it("should get only Munich city data with search name 'Mun' page no 1 and size 4", async () => {
        const result: PaginatedResponse<City> = await cityService.getAll(
            { name: 'Mun' },
            { no: 1, size: 4 }
        )

        expect(result.data.length).toBe(1)
        expect(result.pages).toBe(1)
        expect(result.prev).toBeUndefined()
        expect(result.next).toBeUndefined()
    })
})
