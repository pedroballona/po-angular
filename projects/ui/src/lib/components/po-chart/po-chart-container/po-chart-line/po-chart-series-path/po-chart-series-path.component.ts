import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[po-chart-series-path]',
  templateUrl: './po-chart-series-path.component.svg'
})
export class PoChartSeriesPathComponent {
  colors = {
    0: 'po-color-01',
    1: 'po-color-02',
    2: 'po-color-03',
    3: 'po-color-04',
    4: 'po-color-05',
    5: 'po-color-06',
    6: 'po-color-07',
    7: 'po-color-08',
    8: 'po-color-09',
    9: 'po-color-10',
    10: 'po-color-11',
    11: 'po-color-12'
  };

  @Input('p-series-points') seriesPoints: Array<any>;

  constructor() {}
}
