import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[po-chart-axis-y-label]',
  templateUrl: './po-chart-axis-y-label.component.svg'
})
export class PoChartAxisYLabelComponent implements OnInit {
  @Input('p-axis-y-label-points') axisYLabelPoints: Array<{ label: string; xCoordinate: string; yCoordinate: string }>;

  constructor() {}

  ngOnInit(): void {}

  trackBy(index) {
    return index;
  }
}
