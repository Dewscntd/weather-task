import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, transition, style, animate, } from '@angular/animations';

@Component({
  selector: 'app-forecast-item',
  templateUrl: './forecast-item.component.html',
  styleUrls: ['./forecast-item.component.scss'],
  animations: [
    trigger('scale', [
      state('initial', style({
        transform: 'scale(1)'
      })),
      state('final', style({
        transform: 'scale(1.5)'
      })),
      transition('final=>initial', animate('1000ms')),
      transition('initial=>final', animate('1500ms'))
    ])
  ]
})
export class ForecastItemComponent implements OnInit {
@Input() date
@Input() minTemp
@Input() maxTemp
  constructor() { }

  ngOnInit() {
  }

}
