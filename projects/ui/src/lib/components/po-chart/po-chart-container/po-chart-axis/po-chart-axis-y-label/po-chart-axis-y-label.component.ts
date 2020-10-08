import { Component, Input, OnInit } from '@angular/core';

import { PADDING } from '../../../helpers/default-values';

@Component({
  selector: '[po-chart-axis-y-label]',
  templateUrl: './po-chart-axis-y-label.component.svg'
})
export class PoChartAxisYLabelComponent implements OnInit {
  @Input('p-categories') categories: any;

  @Input('p-container-size') containerSize: any;

  constructor() {}

  ngOnInit(): void {}

  calculateAxisLabelXPoint(index: number) {
    const ratio = index / (this.categories.length - 1);

    return PADDING * 4 + ratio * this.containerSize.svgPlottingAreaWidth;
  }

  calculateAxisLabelYPoint(index: number) {
    const textPadding = PADDING / 3;

    return this.containerSize.containerHeight - textPadding;
  }
}
