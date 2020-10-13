import { Component, Input } from '@angular/core';

@Component({
  selector: '[po-chart-axis-x]',
  templateUrl: './po-chart-axis-x.component.svg'
})
export class PoChartAxisXComponent {
  @Input('p-axis-x-points') axisXPoints: Array<{ coordinates: string }>;

  constructor() {}
}
