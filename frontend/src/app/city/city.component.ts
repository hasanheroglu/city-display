import { AfterViewInit, Component, OnDestroy, inject } from '@angular/core';
import { CityCardComponent } from '../city-card/city-card.component';
import { City } from '../city';
import { CityService } from '../city.service';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../map/map.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PageRequest } from '../page.request';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [CityCardComponent, MapComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './city.component.html',
  styleUrl: './city.component.scss'
})

export class CityComponent implements AfterViewInit, OnDestroy {
  cityService: CityService = inject(CityService);
  selectedCity: City | undefined;
  cityList: City[] = [];
  searchValue = new FormControl("");
  lastSearchedValue: string = "";
  prevPage?: PageRequest;
  nextPage?: PageRequest;
  pageSize: number = 4;
  page = new BehaviorSubject<number>(1);
  pageSubscription: Subscription;
  pages: number = 1;

  constructor() {
    this.pageSubscription = this.page.asObservable().subscribe(p => {
      const button = document.getElementById(`page-${p}`);
      if (button) this.activateButton(button as HTMLElement);
    })
    this.getCities();
  }
  ngAfterViewInit(): void {
    this.page.next(1);
  }

  ngOnDestroy(): void {
    this.pageSubscription.unsubscribe();
  }

  search() {
    this.lastSearchedValue = this.searchValue.getRawValue() ?? "";
    this.page.next(1);
    this.getCities();
  }

  selectPage(page?: number) {
    if (!page) return;

    this.page.next(page);
    this.getCities();
  }

  setSelectedCity(city: City) {
    this.selectedCity = city;
  }

  activateButton(button: HTMLElement) {
    const pageButtons = document.getElementsByClassName("page-btn");
    
    for (let i = 0; i < pageButtons.length; i++) {
      pageButtons[i].removeAttribute('disabled');
      pageButtons[i].classList.remove('active');
    }
    
    button.classList.add('active');
    button.setAttribute('disabled', "true");
  }

  getCities() {
    this.cityService.getAll({ name: this.lastSearchedValue }, { no: this.page.getValue(), size: this.pageSize }).then((res) => {
      if (res) {
        this.cityList = res.data;
        this.pages = res.pages;
        this.prevPage = res.prev;
        this.nextPage = res.next;
      }
    })
  }
}
