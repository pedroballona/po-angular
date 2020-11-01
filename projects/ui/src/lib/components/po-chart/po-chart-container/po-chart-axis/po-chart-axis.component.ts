import { Component, Input } from '@angular/core';

import {
  PoChartAxisXLabelArea,
  PoChartAxisXGridLines,
  PoChartPadding,
  PoChartPlotAreaPaddingTop
} from '../../helpers/po-chart-default-values.constant';
import { PoChartMathsService } from '../../services/po-chart-maths.service';

import { PoChartContainerSize } from '../../interfaces/po-chart-container-size.interface';
import { PoChartMinMaxValues } from '../../interfaces/po-chart-min-max-values.interface';
import { PoChartAxisOptions } from '../../interfaces/po-chart-axis-options.interface';

@Component({
  selector: '[po-chart-axis]',
  templateUrl: './po-chart-axis.component.svg'
})
export class PoChartAxisComponent {
  axisXPoints: Array<{ coordinates: string }>;
  axisXLabelPoints: Array<{ label: string; xCoordinate: number; yCoordinate: number }>;
  axisYPoints: Array<{ coordinates: string }>;
  axisYLabelPoints: Array<{ label: string; xCoordinate: number; yCoordinate: number }>;

  private digitsPrecision: number = 0;
  private minMaxAxisValues: PoChartMinMaxValues;
  private seriesLength: number;

  private _axisOptions: PoChartAxisOptions;
  private _axisXGridLines: number = PoChartAxisXGridLines;
  private _categories: Array<string> = [];
  private _containerSize: PoChartContainerSize = {};
  private _series: Array<any> = [];

  @Input('p-series') set series(value: Array<any>) {
    this._series = value;

    this.seriesLength = this.mathsService.seriesGreaterLength(this.series);
    this.minMaxAxisValues = this.mathsService.calculateMinAndMaxValues(this._series);
    this.checkAxisOptions(this.minMaxAxisValues, this.axisOptions);
  }

  get series() {
    return this._series;
  }

  @Input('p-axis-x-grid-lines') set axisXGridLines(value: number) {
    this._axisXGridLines = value;

    this.setAxisXPoints(this._axisXGridLines, this.containerSize);
    this.setAxisXLabelPoints(this._axisXGridLines, this.containerSize, this.minMaxAxisValues, this.digitsPrecision);
  }

  get axisXGridLines() {
    return this._axisXGridLines;
  }

  @Input('p-categories') set categories(value: Array<string>) {
    this._categories = value;

    this.setAxisYPoints(this.containerSize, this.seriesLength);
    this.setAxisYLabelPoints(this.containerSize, this.seriesLength, this._categories);
  }

  get categories() {
    return this._categories;
  }

  @Input('p-container-size') set containerSize(value: PoChartContainerSize) {
    this._containerSize = value;

    this.setAxisXPoints(this.axisXGridLines, this._containerSize);
    this.setAxisXLabelPoints(this.axisXGridLines, this._containerSize, this.minMaxAxisValues, this.digitsPrecision);
    this.setAxisYPoints(this._containerSize, this.seriesLength);
    this.setAxisYLabelPoints(this._containerSize, this.seriesLength, this._categories);
  }

  get containerSize() {
    return this._containerSize;
  }

  @Input('p-options') set axisOptions(value: PoChartAxisOptions) {
    if (value instanceof Object && !(value instanceof Array)) {
      this._axisOptions = value;

      this.checkAxisOptions(this.minMaxAxisValues, this._axisOptions);
      this.setAxisXLabelPoints(this.axisXGridLines, this.containerSize, this.minMaxAxisValues, this.digitsPrecision);
    }
  }

  get axisOptions() {
    return this._axisOptions;
  }

  constructor(private mathsService: PoChartMathsService) {}

  private setAxisXPoints(axisXGridLines: number, containerSize: PoChartContainerSize) {
    this.axisXPoints = [...Array(axisXGridLines)].map((_, index: number) => {
      const startX = PoChartAxisXLabelArea;
      const endX = containerSize.svgWidth;
      const yCoordinate = this.calculateAxisXCoordinateY(axisXGridLines, containerSize, index);

      const coordinates = `M${startX} ${yCoordinate} L${endX}, ${yCoordinate}`;

      return { coordinates };
    });
  }

  private setAxisXLabelPoints(
    axisXGridLines: number,
    containerSize: PoChartContainerSize,
    minMaxAxisValues: PoChartMinMaxValues,
    digitsPrecision: number
  ) {
    const labels = this.mathsService.range(minMaxAxisValues, axisXGridLines);

    this.axisXLabelPoints = labels.map((labelItem, index: number) => {
      const label = labelItem.toFixed(digitsPrecision);
      const xCoordinate = this.calculateAxisXLabelXPoint();
      const yCoordinate = this.calculateAxisXCoordinateY(axisXGridLines, containerSize, index);

      return { label, xCoordinate, yCoordinate };
    });
  }

  private setAxisYPoints(containerSize: PoChartContainerSize, seriesLength: number) {
    const startY = PoChartPlotAreaPaddingTop;
    const endY = containerSize.svgPlottingAreaHeight + PoChartPlotAreaPaddingTop;

    const outerYPoints = this.setAxisYOuterPoints(startY, endY, containerSize);

    const innerYPoints = [...Array(seriesLength)].map((_, index: number) => {
      const xCoordinate = this.calculateAxisYCoordinateX(containerSize, index);

      const coordinates = `M${xCoordinate} ${startY} L${xCoordinate}, ${endY}`;

      return { coordinates };
    });

    this.axisYPoints = [...outerYPoints, ...innerYPoints];
  }

  private setAxisYOuterPoints(startY: number, endY: number, containerSize: PoChartContainerSize) {
    const firstLineCoordinates = {
      coordinates: `M${PoChartAxisXLabelArea} ${startY} L${PoChartAxisXLabelArea} ${endY}`
    };
    const lastLineCoordinates = {
      coordinates: `M${containerSize.svgWidth} ${startY} L${containerSize.svgWidth} ${endY}`
    };

    return [firstLineCoordinates, lastLineCoordinates];
  }

  private setAxisYLabelPoints(
    containerSize: PoChartContainerSize,
    seriesLength: number,
    categories: Array<string> = []
  ) {
    this.axisYLabelPoints = [...Array(seriesLength)].map((_, index: number) => {
      const label = categories[index] ?? '-';

      const xCoordinate = this.calculateAxisYCoordinateX(containerSize, index);
      const yCoordinate = this.calculateAxisYLabelYPoint(containerSize);

      return { label, xCoordinate, yCoordinate };
    });
  }

  private calculateAxisXLabelXPoint(): number {
    const labelPoChartPadding = PoChartPadding / 3;

    return PoChartAxisXLabelArea - labelPoChartPadding;
  }

  private calculateAxisXCoordinateY(
    axisXGridLines: number,
    containerSize: PoChartContainerSize,
    index: number
  ): number {
    const yRatio = index / (axisXGridLines - 1);

    return (
      containerSize.svgPlottingAreaHeight - containerSize.svgPlottingAreaHeight * yRatio + PoChartPlotAreaPaddingTop
    );
  }

  private calculateAxisYLabelYPoint(containerSize: PoChartContainerSize): number {
    const textPoChartPadding = PoChartPadding / 3;

    return containerSize.svgHeight - textPoChartPadding;
  }

  private calculateAxisYCoordinateX(containerSize: PoChartContainerSize, index: number): number {
    const xRatio = index / (this.seriesLength - 1);
    const svgAxisSideSpacing = this.mathsService.calculateSideSpacing(containerSize.svgWidth, this.seriesLength);

    return PoChartAxisXLabelArea + svgAxisSideSpacing + containerSize.svgPlottingAreaWidth * xRatio;
  }

  private checkAxisOptions(minMaxAxisValues: PoChartMinMaxValues, axisOptions: PoChartAxisOptions = {}): void {
    const { minRange, maxRange, axisXGridLines } = axisOptions;

    minMaxAxisValues.minValue = minRange < minMaxAxisValues.minValue ? minRange : minMaxAxisValues.minValue;
    minMaxAxisValues.maxValue = maxRange > minMaxAxisValues.maxValue ? maxRange : minMaxAxisValues.maxValue;

    this.axisXGridLines =
      axisXGridLines && this.isValidGridLinesLengthOption(axisXGridLines) ? axisXGridLines : PoChartAxisXGridLines;
  }

  private isValidGridLinesLengthOption(axisXGridLines: number): boolean {
    return axisXGridLines >= 2 && axisXGridLines <= 10;
  }
}
