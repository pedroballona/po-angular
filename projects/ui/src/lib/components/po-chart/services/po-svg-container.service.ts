import { Injectable } from '@angular/core';

import { AXIS_X_LABEL_AREA, PADDING } from '../helpers/default-values';
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
    categoriesLength: number
  ): PoChartContainerSize {
    // Largura do container
    const svgWidth = chartWrapperWidth - PADDING * 2;

    const centerX = chartWrapperWidth / 2;

    // Altura do container
    const subtractedHeights = chartHeight - chartHeaderHeight - chartLegendHeight - PADDING * 2;
    const svgHeight = subtractedHeights <= 0 ? 0 : subtractedHeights;

    const centerY = svgHeight / 2;

    /**
     * Largura de área de plotagem das séries designada para gráficos do tipo linha e área.
     * Contempla:
     *
     *             largura do svg: svgWidth
     *             - área dos labels eixo X: AXIS_X_LABEL_AREA
     *             - espaços laterais dentro do eixo: svgAxisSideSpace
     *
     * A largura máxima para 'svgAxisSideSpace' é de 48px.
     */
    const categoryWidth = (svgWidth - AXIS_X_LABEL_AREA) / categoriesLength;
    const svgAxisSideSpace = categoryWidth <= PADDING * 2 ? categoryWidth : PADDING * 2;
    const svgPlottingAreaWidth = svgWidth - AXIS_X_LABEL_AREA - svgAxisSideSpace;

    // Altura da área de plotagem
    // Subtrai a altura do container SVG pelo padding superior + área para overflow de labels do eixo X.
    const svgPlottingAreaHeight = svgHeight - PADDING - 8;

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
