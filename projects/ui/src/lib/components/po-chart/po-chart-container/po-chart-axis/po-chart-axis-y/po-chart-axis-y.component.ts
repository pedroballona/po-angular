import { Component, Input } from '@angular/core';

@Component({
  selector: '[po-chart-axis-y]',
  templateUrl: './po-chart-axis-y.component.svg'
})
export class PoChartAxisYComponent {
  @Input('p-axis-y-points') axisYPoints: Array<any>;

  constructor() {}
}
