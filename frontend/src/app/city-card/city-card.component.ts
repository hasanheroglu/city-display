import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { City } from '../city';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-city-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './city-card.component.html',
  styleUrl: './city-card.component.scss'
})
export class CityCardComponent {
  @Input() city!: City;
  @Output() citySelected = new EventEmitter<City>();

  showDetail: boolean = false;

  selectCity() {
    this.citySelected.emit(this.city)
  }
}
