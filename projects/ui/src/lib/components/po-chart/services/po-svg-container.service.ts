import { Injectable } from '@angular/core';

import { PoChartAxisXLabelArea, PoChartPadding } from '../helpers/po-chart-default-values.constant';
import { PoChartContainerSize } from '../interfaces/po-chart-container-size.interface';

@Injectable({
  providedIn: 'root'
})
export class PoSvgContainerService {
  constructor() {}

  /**
   * Retorna um objeto do tipo PoChartContainerSize contendo as dimensões necessárias para plotagem do SVG.
   * @param chartHeight
   * @param chartWrapperWidth
   * @param chartHeaderHeight
   * @param chartLegendHeight
   * @param categoriesLength
   */
  calculatesContainerMeasurements(
    chartHeight: number,
    chartWrapperWidth: number = 0,
    chartHeaderHeight: number = 0,
    chartLegendHeight: number = 0,
    categoriesLength: number = 0
  ): PoChartContainerSize {
    // Largura do container
    const svgWidth = chartWrapperWidth - PoChartPadding * 2;

    const centerX = chartWrapperWidth / 2;

    // Altura do container
    const subtractedHeights = chartHeight - chartHeaderHeight - chartLegendHeight - PoChartPadding * 2;
    const svgHeight = subtractedHeights <= 0 ? 0 : subtractedHeights;

    const centerY = svgHeight / 2;

    /**
     * Largura de área de plotagem das séries designada para gráficos do tipo linha e área.
     * Contempla:
     *
     *             largura do svg: svgWidth
     *             - área dos labels eixo X: PoChartAxisXLabelArea
     *             - espaços laterais dentro do eixo: svgAxisSideSpace
     *
     * A largura máxima para 'svgAxisSideSpace' é de 48px.
     */
    const categoryWidth = (svgWidth - PoChartAxisXLabelArea) / categoriesLength;
    const svgAxisSideSpace = categoryWidth <= PoChartPadding * 2 ? categoryWidth : PoChartPadding * 2;
    const svgPlottingAreaWidth = svgWidth - PoChartAxisXLabelArea - svgAxisSideSpace;

    // Altura da área de plotagem
    // Subtrai a altura do container SVG pelo padding superior + área para overflow de labels do eixo X.
    const svgPlottingAreaHeight = svgHeight - PoChartPadding - 8;

    return {
      svgWidth,
      svgHeight,
      centerX,
      centerY,
      svgPlottingAreaWidth,
      svgPlottingAreaHeight
    };
  }
}
