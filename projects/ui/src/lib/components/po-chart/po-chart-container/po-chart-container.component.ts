import { Component, Input } from '@angular/core';

import { PoChartType } from '../enums/po-chart-type.enum';
import { PoLineChartSeries } from '../interfaces/po-chart-line-series.interface';
import { PoChartContainerSize } from '../interfaces/po-chart-container-size.interface';
import { PoChartMinMaxValues } from '../interfaces/po-chart-min-max-values.interface';
import { PoChartAxes } from '../interfaces/po-chart-axes.interface';

@Component({
  selector: 'po-chart-container',
  templateUrl: './po-chart-container.component.html'
})
export class PoChartContainerComponent {
  viewBox;

  private _series: Array<PoLineChartSeries>;
  private _containerSize: PoChartContainerSize;

  @Input('p-categories') categories: Array<string>;

  @Input('p-container-size') set containerSize(value: PoChartContainerSize) {
    this._containerSize = value;
    this.viewBox = this.setViewBox();
  }

  get containerSize() {
    return this._containerSize;
  }

  @Input('p-min-max-values') minMaxValues: PoChartMinMaxValues;

  @Input('p-axis-options') axisOptions?: PoChartAxes;

  @Input('p-type') type: PoChartType;

  @Input('p-series') set series(value: Array<PoLineChartSeries>) {
    this._series = value;
  }

  get series() {
    return this._series;
  }

  constructor() {}

  setViewBox() {
    const { svgWidth, svgHeight } = this.containerSize;

    // Tratamento necessário para que não corte o vetor nas extremidades
    const offsetXY = 1;

    return `${offsetXY} -${offsetXY} ${svgWidth} ${svgHeight}`;
  }
}
