import { Component, Input, OnInit } from '@angular/core';

import { PADDING } from '../../helpers/default-values';

import { PoLineChartSeries } from '../interfaces/po-chart-line-series.interface';

@Component({
  selector: '[po-chart-axis]',
  templateUrl: './po-chart-axis.component.svg'
})
export class PoChartAxisComponent implements OnInit {
  private _axisXGridLines: number = 5;

  @Input('p-axis-x-grid-lines') set axisXGridLines(value: number) {
    this._axisXGridLines = value;
  }

  get axisXGridLines() {
    return this._axisXGridLines;
  }

  @Input('p-categories') categories: Array<any>;

  @Input('p-series') series: Array<PoLineChartSeries>;

  @Input('p-container-size') containerSize: any;

  @Input('p-min-max-values') minMaxValues: any;

  constructor() {}

  ngOnInit(): void {}
}
