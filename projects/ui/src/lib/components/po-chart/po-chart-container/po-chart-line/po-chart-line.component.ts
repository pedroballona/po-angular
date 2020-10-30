import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

import {
  PoChartAxisXLabelArea,
  PoChartPadding,
  PoChartPlotAreaPaddingTop
} from '../../helpers/po-chart-default-values.constant';

import { PoChartColorService } from '../../services/po-chart-color.service';
import { PoChartMathsService } from '../../services/po-chart-maths.service';

import { PoChartAxisOptions } from '../../interfaces/po-chart-axis-options.interface';
import { PoChartContainerSize } from '../../interfaces/po-chart-container-size.interface';
import { PoChartMinMaxValues } from '../../interfaces/po-chart-min-max-values.interface';
import { PoChartType } from '../../enums/po-chart-type.enum';
import { PoLineChartSeries } from '../../interfaces/po-chart-line-series.interface';

@Component({
  selector: '[po-chart-line]',
  templateUrl: './po-chart-line.component.svg'
})
export class PoChartLineComponent {
  colors: Array<string>;
  seriesPathsCoordinates: Array<{ coordinates: string }>;
  seriesPointsCoordinates: Array<
    Array<{ serieLabel: string; serieValue: number; xCoordinate: number; yCoordinate: number }>
  > = [];

  private minMaxSeriesValues: PoChartMinMaxValues;

  private _containerSize: PoChartContainerSize = {};
  private _options: PoChartAxisOptions;
  private _series: Array<PoLineChartSeries> = [];

  @Input('p-container-size') set containerSize(value: PoChartContainerSize) {
    this._containerSize = value;

    this.getDomainValues(this.series, this._options);
    this.seriePathPointsDefinition(this._containerSize, this.categories, this.series, this.minMaxSeriesValues);
  }

  get containerSize() {
    return this._containerSize;
  }

  @Input('p-categories') categories: Array<string> = [];

  @Input('p-series') set series(value: Array<PoLineChartSeries>) {
    this._series = value;

    this.colors = this.colorService.getSeriesColor(this._series, PoChartType.Line);
    this.getDomainValues(this.series, this._options);
    this.seriePathPointsDefinition(this.containerSize, this.categories, this._series, this.minMaxSeriesValues);
  }

  get series() {
    return this._series;
  }

  @Input('p-options') set options(value: PoChartAxisOptions) {
    if (value instanceof Object && !(value instanceof Array)) {
      this._options = value;

      this.getDomainValues(this.series, this._options);
      this.seriePathPointsDefinition(this.containerSize, this.categories, this._series, this.minMaxSeriesValues);
    }
  }

  get options() {
    return this._options;
  }

  @ViewChild('chartLine') chartLine: ElementRef;

  constructor(
    private colorService: PoChartColorService,
    private mathsService: PoChartMathsService,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}

  trackBy(index) {
    return index;
  }

  private getDomainValues(series: Array<PoLineChartSeries>, options: PoChartAxisOptions = {}): void {
    const seriesMinMaxValues: PoChartMinMaxValues = this.mathsService.calculateMinAndMaxValues(series);

    const minValue = options?.minRange < seriesMinMaxValues.minValue ? options.minRange : seriesMinMaxValues.minValue;
    const maxValue = options?.maxRange > seriesMinMaxValues.maxValue ? options.maxRange : seriesMinMaxValues.maxValue;

    this.minMaxSeriesValues = { minValue, maxValue };
  }

  private seriePathPointsDefinition(
    containerSize: PoChartContainerSize,
    categories: Array<string>,
    series: Array<PoLineChartSeries>,
    minMaxSeriesValues: PoChartMinMaxValues
  ) {
    this.seriesPointsCoordinates = [];

    this.seriesPathsCoordinates = series.map((serie: PoLineChartSeries) => {
      let pathCoordinates: string = '';
      let pointCoordinates: Array<{
        serieLabel: string;
        serieValue: number;
        xCoordinate: number;
        yCoordinate: number;
      }> = [];

      serie.data.forEach((serieValue, index) => {
        const svgPathCommand = index === 0 ? 'M' : 'L';

        // eixo X
        const xRatio = index / (categories.length - 1);
        const svgAxisSideSpacing = this.calculateSideSpacing(containerSize.svgWidth, categories.length);

        const xCoordinate = PoChartAxisXLabelArea + svgAxisSideSpacing + containerSize.svgPlottingAreaWidth * xRatio;

        // eixo Y
        const yRratio = this.mathsService.getSeriePercentage(minMaxSeriesValues, serieValue);
        const yCoordinate =
          containerSize.svgPlottingAreaHeight -
          containerSize.svgPlottingAreaHeight * yRratio +
          PoChartPlotAreaPaddingTop;

        // label da série
        const serieLabel = `${serie['category']}: ${serieValue}`;

        // coordenadas do círculo
        pointCoordinates = [...pointCoordinates, { serieLabel, serieValue, xCoordinate, yCoordinate }];

        // coordenadas da linha
        pathCoordinates += ` ${svgPathCommand}${xCoordinate} ${yCoordinate}`;
      });

      this.seriesPointsCoordinates = [...this.seriesPointsCoordinates, pointCoordinates];

      return { coordinates: pathCoordinates };
    });
  }

  // É necessário reordenar os svgs on hover pois eventualmente os elemntos svg ficam por trás de outros. Não há z-index para svgElement.
  reorderSVGGroup(pathGroup: string) {
    const pathGroupElement = this.elementRef.nativeElement.querySelectorAll(`.${pathGroup}`);

    this.renderer.appendChild(this.chartLine.nativeElement, pathGroupElement[0]);
  }

  private calculateSideSpacing(containerWidth: PoChartContainerSize['svgWidth'], categoriesLength: number): number {
    const halfCategoryWidth = (containerWidth - PoChartAxisXLabelArea) / categoriesLength / 2;

    return halfCategoryWidth <= PoChartPadding ? halfCategoryWidth : PoChartPadding;
  }
}
