import { Component, Input } from '@angular/core';

import { AXISXLABELAREA, PADDING } from '../../helpers/default-values';

import { PoChartContainerSize } from '../../interfaces/po-chart-container-size.interface';
import { PoLineChartSeries } from '../../interfaces/po-chart-line-series.interface';
import { PoChartMinMaxValues } from '../../interfaces/po-chart-min-max-values.interface';

@Component({
  selector: '[po-chart-line]',
  templateUrl: './chart-line.component.svg'
})
export class ChartLineComponent {
  seriesPoints: any;

  private _containerSize: PoChartContainerSize = {};
  private _minMaxValues: PoChartMinMaxValues = {};
  private _series: Array<PoLineChartSeries> = [];

  @Input('p-container-size') set containerSize(value: PoChartContainerSize) {
    this._containerSize = value;

    this.seriePointsDefinition(this._containerSize, this.categories, this.series, this.minMaxValues);
  }

  get containerSize() {
    return this._containerSize;
  }

  @Input('p-categories') categories: Array<any> = [];

  @Input('p-min-max-values') set minMaxValues(value: PoChartMinMaxValues) {
    this._minMaxValues = value;
  }

  get minMaxValues() {
    return this._minMaxValues;
  }

  @Input('p-series') set series(value: Array<PoLineChartSeries>) {
    this._series = value;

    this.seriePointsDefinition(this.containerSize, this.categories, this._series, this.minMaxValues);
  }

  get series() {
    return this._series;
  }

  constructor() {}

  seriePointsDefinition(
    containerSize: PoChartContainerSize,
    categories: Array<any>,
    series: Array<any>,
    minMaxValues: PoChartMinMaxValues
  ) {
    this.seriesPoints = series.map((serie: PoLineChartSeries) => {
      let coordinates = '';

      serie.values.forEach((serieValue, index) => {
        const hasComma = index ? ', ' : '';

        // eixo X
        const xRatio = index / (categories.length - 1);
        const xCoordinate = AXISXLABELAREA + PADDING * 2 + containerSize.svgPlottingAreaWidth * xRatio;

        // eixo Y
        const yRratio = serieValue / minMaxValues.maxValue;
        const yCoordinate = containerSize.svgPlottingAreaHeight - containerSize.svgPlottingAreaHeight * yRratio;

        coordinates += `${hasComma}${xCoordinate} ${yCoordinate}`;
      });

      return { coordinates };
    });
    console.log('seriesPoints', this.seriesPoints);
  }
}
