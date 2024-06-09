import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CityComponent } from './city.component'
import { CityService } from '../../services/city/city.service'

describe('CityComponent', () => {
    let component: CityComponent
    let fixture: ComponentFixture<CityComponent>
    let cityServiceSpy: jasmine.SpyObj<CityService>

    beforeEach(async () => {
        cityServiceSpy = jasmine.createSpyObj('CityService', ['getAll'])
        cityServiceSpy.getAll.and.resolveTo({
            data: [],
            current: { no: 1, size: 4 },
            pages: 0,
        })

        await TestBed.configureTestingModule({
            imports: [CityComponent],
            providers: [{ provide: CityService, useValue: cityServiceSpy }],
        }).compileComponents()

        fixture = TestBed.createComponent(CityComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
        cityServiceSpy.getAll.calls.reset()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    describe('onSearchValueChanged', () => {
        it('should do nothing when search value is changed to not an empty string', () => {
            component.searchValue.setValue('mun')
            fixture.detectChanges()

            expect(cityServiceSpy.getAll).toHaveBeenCalledTimes(0)
        })

        it('should do nothing when search value is changed to empty string and last searched value is empty', () => {
            component.lastSearchedValue = ''
            component.searchValue.setValue('')
            fixture.detectChanges()

            expect(cityServiceSpy.getAll).toHaveBeenCalledTimes(0)
        })

        it('should get cities when search value is changed to empty string and last searched value is not empty', () => {
            component.lastSearchedValue = 'mun'
            component.searchValue.setValue('')
            fixture.detectChanges()

            expect(cityServiceSpy.getAll).toHaveBeenCalledOnceWith(
                { name: '' },
                { no: component.page.getValue(), size: component.pageSize }
            )
        })
    })

    describe('search', () => {
        it("should get cities, set page to 1 and last searched value to form input's value when a search is called", () => {
            const searchValue = 'Munich'

            component.searchValue.setValue(searchValue)
            component.search()
            fixture.detectChanges()

            expect(component.lastSearchedValue).toBe(searchValue)
            expect(component.page.getValue()).toBe(1)
            expect(cityServiceSpy.getAll).toHaveBeenCalledOnceWith(
                { name: searchValue },
                { no: 1, size: component.pageSize }
            )
        })
    })

    describe('selectPage', () => {
        it('should change page to given value and get cities when select page with number input is called', () => {
            component.pages = 4
            const newPage = 3

            component.selectPage(newPage)
            fixture.detectChanges()

            expect(component.page.getValue()).toBe(newPage)
            expect(cityServiceSpy.getAll).toHaveBeenCalledOnceWith(
                { name: component.lastSearchedValue },
                { no: newPage, size: component.pageSize }
            )
        })

        it('should not change page when page input is undefined', () => {
            const pageBeforeCall = component.page.getValue()
            component.selectPage()
            fixture.detectChanges()

            expect(component.page.getValue()).toBe(pageBeforeCall)
            expect(cityServiceSpy.getAll).toHaveBeenCalledTimes(0)
        })

        it('should not change page when given page input is greater than total pages', () => {
            component.pages = 2
            const pageBeforeCall = component.page.getValue()
            component.selectPage(3)
            fixture.detectChanges()

            expect(component.page.getValue()).toBe(pageBeforeCall)
            expect(cityServiceSpy.getAll).toHaveBeenCalledTimes(0)
        })

        it('should not change page when given page input is smaller than zero', () => {
            component.pages = 2
            const pageBeforeCall = component.page.getValue()
            component.selectPage(0)
            fixture.detectChanges()

            expect(component.page.getValue()).toBe(pageBeforeCall)
            expect(cityServiceSpy.getAll).toHaveBeenCalledTimes(0)
        })
    })

    describe('setSelectedCity', () => {
        it('should set selected city to given city', () => {
            const city = {
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

            component.setSelectedCity(city)

            expect(component.selectedCity).toBe(city)
        })
    })
})
