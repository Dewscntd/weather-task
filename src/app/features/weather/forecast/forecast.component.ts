import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate(2000)
      ])
    ]),
  ]
})
export class ForecastComponent implements OnInit {
   @Input() fiveDaysForecst
  constructor() { }

  ngOnInit() {
  }

}
