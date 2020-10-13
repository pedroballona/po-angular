import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[po-chart-path]',
  templateUrl: './po-chart-path.component.svg'
})
export class PoChartPathComponent {
  @Input('p-color') color?: string;

  @Input('p-coordinates') coordinates: Array<{ coordinates: string }>;

  constructor() {}
}
