import { Component, Input, OnInit } from '@angular/core';

import { PADDING } from '../../helpers/default-values';

import { PoLineChartSeries } from '../interfaces/po-chart-line-series.interface';

@Component({
  selector: '[po-chart-axis]',
  templateUrl: './chart-axis.component.svg'
})
export class ChartAxisComponent implements OnInit {
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

  counter(number: number) {
    return new Array(number);
  }

  setAxisXPoints(index: number) {
    const startX = PADDING * 2;
    const endX = this.containerSize.containerWidth;

    const ratio = index / (this.axisXGridLines - 1);
    const yCoordinate = this.containerSize.svgPlottingAreaHeight - this.containerSize.svgPlottingAreaHeight * ratio;

    return `${startX}, ${yCoordinate}, ${endX}, ${yCoordinate}`;
  }

  setAxisYOuterPoints(index: number) {
    const startY = 0;
    const endY = this.containerSize.svgPlottingAreaHeight;

    const xCoordinate = index === 0 ? PADDING * 2 : this.containerSize.containerWidth;

    return `${xCoordinate}, ${startY}, ${xCoordinate}, ${endY}`;
  }

  setAxisYPoints(index: number) {
    const startY = 0;
    const endY = this.containerSize.svgPlottingAreaHeight;

    const ratio = index / (this.categories.length - 1);
    const xCoordinate = PADDING * 4 + ratio * this.containerSize.svgPlottingAreaWidth;

    return `${xCoordinate}, ${startY}, ${xCoordinate}, ${endY}`;
  }
}
