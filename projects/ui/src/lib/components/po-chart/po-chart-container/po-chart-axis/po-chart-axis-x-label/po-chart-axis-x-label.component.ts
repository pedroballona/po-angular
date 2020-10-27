import { Component, Input } from '@angular/core';

@Component({
  selector: '[po-chart-axis-x-label]',
  templateUrl: './po-chart-axis-x-label.component.svg'
})
export class PoChartAxisXLabelComponent {
  @Input('p-axis-x-label-points') axisXLabelPoints: Array<{ label: string; xCoordinate: string; yCoordinate: string }>;

  constructor() {}

  trackBy(index) {
    return index;
  }
}
