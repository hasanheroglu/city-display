import { AfterViewInit, Component, OnDestroy, inject } from '@angular/core'
import { CityCardComponent } from '../city-card/city-card.component'
import { City } from '../../model/city/city'
import { CityService } from '../../services/city/city.service'
import { CommonModule } from '@angular/common'
import { MapComponent } from '../map/map.component'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { PageRequest } from '../../model/request/page.request'
import { BehaviorSubject, Subscription } from 'rxjs'
import { PaginatedResponse } from '../../model/response/paginated.response'

@Component({
    selector: 'app-city',
    standalone: true,
    imports: [
        CityCardComponent,
        MapComponent,
        CommonModule,
        ReactiveFormsModule,
    ],
    templateUrl: './city.component.html',
    styleUrl: './city.component.scss',
})
export class CityComponent implements AfterViewInit, OnDestroy {
    private cityService: CityService = inject(CityService)
    selectedCity: City | undefined
    cityList: City[] = []
    searchValue = new FormControl('')
    lastSearchedValue = ''
    prevPage?: PageRequest
    nextPage?: PageRequest
    pageSize = 4
    page = new BehaviorSubject<number>(1)
    pageSubscription: Subscription
    pages = 1

    constructor() {
        this.pageSubscription = this.page.asObservable().subscribe((p) => {
            const button = document.getElementById(`page-${p}`)
            if (button) this.activateButton(button as HTMLElement)
        })
        this.getCities()
    }
    ngAfterViewInit(): void {
        this.page.next(1)
    }

    ngOnDestroy(): void {
        this.pageSubscription.unsubscribe()
    }

    search() {
        this.lastSearchedValue = this.searchValue.getRawValue() ?? ''
        this.page.next(1)
        this.getCities()
    }

    selectPage(page?: number) {
        if (page === undefined || page > this.pages || page <= 0) return

        this.page.next(page)
        this.getCities()
    }

    setSelectedCity(city: City) {
        this.selectedCity = city
    }

    activateButton(button: HTMLElement) {
        const pageButtons = document.getElementsByClassName('page-btn')

        for (let i = 0; i < pageButtons.length; i++) {
            pageButtons[i].removeAttribute('disabled')
            pageButtons[i].classList.remove('active')
        }

        button.classList.add('active')
        button.setAttribute('disabled', 'true')
    }

    getCities() {
        this.cityService
            .getAll(
                { name: this.lastSearchedValue },
                { no: this.page.getValue(), size: this.pageSize }
            )
            .then((res: PaginatedResponse<City> | undefined) => {
                if (res) {
                    this.cityList = res.data
                    this.pages = res.pages
                    this.prevPage = res.prev
                    this.nextPage = res.next
                }
            })
    }

    onSearchValueChange() {
        if (
            this.searchValue.getRawValue() === '' &&
            this.lastSearchedValue != ''
        ) {
            this.lastSearchedValue = ''
            this.getCities()
            this.page.next(1)
        }
    }
}
