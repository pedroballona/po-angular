import { Component, Input, OnInit } from '@angular/core';

import { PADDING } from '../../../helpers/default-values';

@Component({
  selector: '[po-chart-axis-x-label]',
  templateUrl: './po-chart-axis-x-label.component.svg'
})
export class PoChartAxisXLabelComponent implements OnInit {
  axisXLabels: Array<any> = [];

  private _axisXGridLines: number;
  private digitsPrecision: number = 0;

  @Input('p-min-max-values') minMaxValues: any;

  @Input('p-container-size') containerSize: any;

  @Input('p-axis-x-grid-lines') set axisXGridLines(value: number) {
    this._axisXGridLines = value;

    this.defineAxisXLabels(this.minMaxValues, this._axisXGridLines, this.digitsPrecision, this.containerSize);
  }

  get axisXGridLines() {
    return this._axisXGridLines;
  }

  constructor() {}

  ngOnInit() {}

  counter(number: number) {
    return new Array(number);
  }

  private defineAxisXLabels(minMaxValues: any, axisXGridLines: number, digitsPrecision: number, containerSize) {
    [...Array(axisXGridLines)].forEach((_, index: number) => {
      const label = (minMaxValues.maxValue * (index / (axisXGridLines - 1))).toFixed(digitsPrecision);

      // const x = this.calculateAxisLabelXPoint(index);
      // const y = this.calculateAxisLabelYPoint(index, axisXGridLines, containerSize);

      // this.axisXLabels = [...this.axisXLabels, { label, x, y }];

      this.axisXLabels = [...this.axisXLabels, label];
    });
  }

  calculateAxisLabelXPoint(index: number) {
    const textPadding = PADDING / 3;

    return PADDING * 2 - textPadding;
  }

  calculateAxisLabelYPoint(index: number) {
    const ratio = index / (this.axisXGridLines - 1);

    return this.containerSize.svgPlottingAreaHeight - this.containerSize.svgPlottingAreaHeight * ratio;
  }
}
