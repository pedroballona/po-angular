import { Component, Input } from '@angular/core';

import { AXISXLABELAREA, AXISXGRIDLINES, PADDING } from '../../helpers/default-values';

import { PoLineChartSeries } from '../../interfaces/po-chart-line-series.interface';

@Component({
  selector: '[po-chart-axis]',
  templateUrl: './po-chart-axis.component.svg'
})
export class PoChartAxisComponent {
  axisXPoints;
  axisXLabelPoints;

  axisYPoints;
  axisYLabelPoints;

  private digitsPrecision: number = 0;
  private _axisXGridLines: number = AXISXGRIDLINES;
  private _categories: Array<any> = [];
  private _containerSize: any = {};
  private _minMaxValues: any = {};

  // externar
  @Input('p-axis-x-grid-lines') set axisXGridLines(value: number) {
    this._axisXGridLines = value;

    this.setAxisXPoints(this._axisXGridLines, this.containerSize);
    this.setAxisXLabelPoints(this._axisXGridLines, this.containerSize, this.minMaxValues, this.digitsPrecision);
  }

  get axisXGridLines() {
    return this._axisXGridLines;
  }

  @Input('p-categories') set categories(value: Array<any>) {
    this._categories = value;

    this.setAxisYPoints(this.containerSize, this._categories);
    this.setAxisYLabelPoints(this._categories, this.containerSize);
  }

  get categories() {
    return this._categories;
  }

  @Input('p-container-size') set containerSize(value: any) {
    this._containerSize = value;

    this.setAxisXPoints(this.axisXGridLines, this._containerSize);
    this.setAxisXLabelPoints(this.axisXGridLines, this._containerSize, this.minMaxValues, this.digitsPrecision);
    this.setAxisYPoints(this._containerSize, this.categories);
    this.setAxisYLabelPoints(this.categories, this._containerSize);
  }

  get containerSize() {
    return this._containerSize;
  }

  @Input('p-min-max-values') set minMaxValues(value: any) {
    this._minMaxValues = value;

    this.setAxisXLabelPoints(this.axisXGridLines, this.containerSize, this._minMaxValues, this.digitsPrecision);
  }

  get minMaxValues() {
    return this._minMaxValues;
  }

  constructor() {}

  private setAxisXPoints(axisXGridLines: number, containerSize: any) {
    this.axisXPoints = [...Array(axisXGridLines)].map((_, index: number) => {
      const startX = AXISXLABELAREA;
      const endX = containerSize.containerWidth;
      const yCoordinate = this.calculateAxisXCoordinateY(axisXGridLines, containerSize, index);

      const coordinates = `${startX}, ${yCoordinate}, ${endX}, ${yCoordinate}`;

      return { coordinates };
    });
  }

  private setAxisXLabelPoints(axisXGridLines: number, containerSize: any, minMaxValues: any, digitsPrecision: number) {
    this.axisXLabelPoints = [...Array(axisXGridLines)].map((_, index: number) => {
      const label = (minMaxValues.maxValue * (index / (axisXGridLines - 1))).toFixed(digitsPrecision);

      const xCoordinate = this.calculateAxisXLabelXPoint(index);
      const yCoordinate = this.calculateAxisXCoordinateY(axisXGridLines, containerSize, index);

      return { label, xCoordinate, yCoordinate };
    });
  }

  private setAxisYPoints(containerSize: any, categories: Array<any>) {
    const startY = 0;
    const endY = containerSize.svgPlottingAreaHeight;

    const outerYPoints = this.setAxisOuterPoints(startY, endY, containerSize);

    const innerYPoints = categories.map((category: any, index: number) => {
      const xCoordinate = this.calculateAxisYCoordinateX(containerSize, categories, index);

      const coordinates = `${xCoordinate}, ${startY}, ${xCoordinate}, ${endY}`;

      return { coordinates };
    });

    this.axisYPoints = [...outerYPoints, ...innerYPoints];
  }

  private setAxisOuterPoints(startY: number, endY: number, containerSize) {
    const firstLineCoordinates = { coordinates: `${AXISXLABELAREA}, ${startY}, ${AXISXLABELAREA}, ${endY}` };
    const lastLineCoordinates = {
      coordinates: `${containerSize.containerWidth}, ${startY}, ${containerSize.containerWidth}, ${endY}`
    };

    return [firstLineCoordinates, lastLineCoordinates];
  }

  private setAxisYLabelPoints(categories: Array<any>, containerSize: any) {
    this.axisYLabelPoints = categories.map((category: any, index: number) => {
      const label = category;

      const xCoordinate = this.calculateAxisYCoordinateX(containerSize, categories, index);
      const yCoordinate = this.calculateAxisYLabelYPoint(containerSize, index);

      return { label, xCoordinate, yCoordinate };
    });
  }

  private calculateAxisXLabelXPoint(index: number) {
    const labelPadding = PADDING / 3;

    return AXISXLABELAREA - labelPadding;
  }

  private calculateAxisXCoordinateY(axisXGridLines: number, containerSize, index: number) {
    const yRatio = index / (axisXGridLines - 1);

    return containerSize.svgPlottingAreaHeight - containerSize.svgPlottingAreaHeight * yRatio;
  }

  private calculateAxisYLabelYPoint(containerSize: any, index: number) {
    const textPadding = PADDING / 3;

    return containerSize.containerHeight - textPadding;
  }

  private calculateAxisYCoordinateX(containerSize: any, categories: Array<any>, index: number) {
    const xRatio = index / (categories.length - 1);

    return AXISXLABELAREA + PADDING * 2 + containerSize.svgPlottingAreaWidth * xRatio;
  }
}
