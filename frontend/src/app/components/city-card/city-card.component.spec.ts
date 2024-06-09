import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CityCardComponent } from './city-card.component'

describe('CityCardComponent', () => {
    let component: CityCardComponent
    let fixture: ComponentFixture<CityCardComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CityCardComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(CityCardComponent)
        component = fixture.componentInstance
        component.city = {
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
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should emit event with the city', () => {
        spyOn(component.citySelected, 'emit')

        component.selectCity()
        fixture.detectChanges()
        expect(component.citySelected.emit).toHaveBeenCalledOnceWith(
            component.city
        )
    })
})
