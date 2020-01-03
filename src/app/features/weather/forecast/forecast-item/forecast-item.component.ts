import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-forecast-item',
  templateUrl: './forecast-item.component.html',
  styleUrls: ['./forecast-item.component.scss']
})
export class ForecastItemComponent implements OnInit {
@Input() date
@Input() minTemp
@Input() maxTemp
  constructor() { }

  ngOnInit() {
  }

}
