import { Component, Input, OnInit } from '@angular/core';

import { PADDING } from '../../../helpers/default-values';

@Component({
  selector: '[po-chart-axis-x]',
  templateUrl: './po-chart-axis-x.component.svg'
})
export class PoChartAxisXComponent {
  axisXLines = [];

  @Input('p-axis-x-grid-lines') axisXGridLines: number;

  @Input('p-container-size') containerSize: any;

  constructor() {}

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
}
