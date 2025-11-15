import { Component ,inject} from '@angular/core';
import {HousingLocation} from '../housing-location/housing-location';
import {HousingService} from '../housing.service';
import {HousingLocationInfo} from '../housinglocation';


@Component({
  selector: 'app-home',
  imports: [HousingLocation],
  template: `
     <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
       @for(housingLocation of filteredLocationList; track $index) {
        <app-housing-location [housingLocation]="housingLocation" />
      }
    </section>
  `,
  styleUrls: ['./home.css'],
})
export class Home {
 housingLocationList: HousingLocationInfo[] = [];
 filteredLocationList: HousingLocationInfo[] = [];
  housingService: HousingService = inject(HousingService);
 constructor() {
    this.housingService
      .getAllHousingLocations()
      .then((housingLocationList: HousingLocationInfo[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
      });
  }
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }
}
