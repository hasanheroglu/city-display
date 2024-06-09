import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { CityComponent } from './components/city/city.component'

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CityComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {}
