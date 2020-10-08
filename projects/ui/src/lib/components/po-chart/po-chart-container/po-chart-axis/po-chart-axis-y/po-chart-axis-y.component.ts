import { Component, Input, OnInit } from '@angular/core';

import { PADDING } from '../../../helpers/default-values';

@Component({
  selector: '[po-chart-axis-y]',
  templateUrl: './po-chart-axis-y.component.svg'
})
export class PoChartAxisYComponent {
  @Input('p-categories') categories: Array<any>;

  @Input('p-container-size') containerSize: any;

  constructor() {}

  counter(number: number) {
    return new Array(number);
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
