import { Component, Input } from '@angular/core';

import { PoChartType } from '../enums/po-chart-type.enum';
import { PoLineChartSeries } from '../interfaces/po-chart-line-series.interface';
import { PoChartContainerSize } from '../interfaces/po-chart-container-size.interface';
import { PoChartOptions } from '../interfaces/po-chart-options.interface';

@Component({
  selector: 'po-chart-container',
  templateUrl: './po-chart-container.component.html'
})
export class PoChartContainerComponent {
  viewBox: string;

  private _containerSize: PoChartContainerSize;

  @Input('p-categories') categories: Array<string>;

  @Input('p-container-size') set containerSize(value: PoChartContainerSize) {
    this._containerSize = value;
    this.viewBox = this.setViewBox();
  }

  get containerSize() {
    return this._containerSize;
  }

  @Input('p-options') options?: PoChartOptions;

  @Input('p-type') type: PoChartType;

  @Input('p-series') series: Array<PoLineChartSeries>;

  constructor() {}

  private setViewBox() {
    const { svgWidth, svgHeight } = this.containerSize;

    // Tratamento necessário para que não corte o vetor nas extremidades
    const offsetXY = 1;

    return `${offsetXY} -${offsetXY} ${svgWidth} ${svgHeight}`;
  }
}
