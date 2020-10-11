import { Component, Input } from '@angular/core';

import { AXIS_X_LABEL_AREA, PADDING, PLOT_AREA_TOP_PADDING } from '../../helpers/default-values';
import { getSeriePercentage } from '../../helpers/maths';

import { PoChartContainerSize } from '../../interfaces/po-chart-container-size.interface';
import { PoLineChartSeries } from '../../interfaces/po-chart-line-series.interface';
import { PoChartMinMaxValues } from '../../interfaces/po-chart-min-max-values.interface';

@Component({
  selector: '[po-chart-line]',
  templateUrl: './po-chart-line.component.svg'
})
export class PoChartLineComponent {
  seriesPathCoordinates: any;

  private _containerSize: PoChartContainerSize = {};
  private _minMaxSeriesValues: PoChartMinMaxValues = {};
  private _series: Array<PoLineChartSeries> = [];

  @Input('p-container-size') set containerSize(value: PoChartContainerSize) {
    this._containerSize = value;

    this.seriePathPointsDefinition(this._containerSize, this.categories, this.series, this.minMaxSeriesValues);
  }

  get containerSize() {
    return this._containerSize;
  }

  @Input('p-categories') categories: Array<any> = [];

  @Input('p-min-max-series-values') set minMaxSeriesValues(value: PoChartMinMaxValues) {
    this._minMaxSeriesValues = value;
  }

  get minMaxSeriesValues() {
    return this._minMaxSeriesValues;
  }

  @Input('p-series') set series(value: Array<PoLineChartSeries>) {
    this._series = value;

    this.seriePathPointsDefinition(this.containerSize, this.categories, this._series, this.minMaxSeriesValues);
  }

  get series() {
    return this._series;
  }

  constructor() {}

  seriePathPointsDefinition(
    containerSize: PoChartContainerSize,
    categories: Array<any>,
    series: Array<any>,
    minMaxSeriesValues: PoChartMinMaxValues
  ) {
    this.seriesPathCoordinates = series.map((serie: PoLineChartSeries) => {
      let coordinates = '';

      serie.values.forEach((serieValue, index) => {
        const svgPathCommand = index === 0 ? 'M' : 'L';

        // eixo X
        const xRatio = index / (categories.length - 1);
        const xCoordinate = AXIS_X_LABEL_AREA + PADDING * 2 + containerSize.svgPlottingAreaWidth * xRatio;

        // eixo Y
        const yRratio = getSeriePercentage(minMaxSeriesValues, serieValue);

        const yCoordinate =
          containerSize.svgPlottingAreaHeight - containerSize.svgPlottingAreaHeight * yRratio + PLOT_AREA_TOP_PADDING;

        coordinates += ` ${svgPathCommand}${xCoordinate} ${yCoordinate}`;
      });

      return { coordinates };
    });
  }
}
