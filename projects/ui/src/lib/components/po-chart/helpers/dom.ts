import { PADDING, AXIS_X_LABEL_AREA } from './default-values';
import { PoChartContainerSize } from '../interfaces/po-chart-container-size.interface';

/**
 * Calcula as dimensões do container
 *
 */
export function calculateContainerSize(
  chartHeight: number,
  chartWrapperWidth: number = 0,
  chartHeaderHeight: number = 0,
  chartLegendHeight: number = 0
): PoChartContainerSize {
  // Largura do container
  const svgWidth = chartWrapperWidth - PADDING * 2;
  const centerX = chartWrapperWidth / 2;

  // Largura da área de plotagem
  // Largura container SVG - PADDING LEFT - (AXIS X LABEL AREA: padding x 2) - (SVG AXIS INTERNAL PLOT AREA: padding left + padding left) - PADDING RIGHT
  const svgPlottingAreaWidth = svgWidth - AXIS_X_LABEL_AREA - PADDING * 4;

  // Altura do container
  const subtractedHeights = chartHeight - chartHeaderHeight - chartLegendHeight - PADDING * 2;

  const svgHeight = subtractedHeights <= 0 ? 0 : subtractedHeights;
  const centerY = svgHeight / 2;

  // Altura da área de plotagem
  // Subtrai a altura do container SVG pelos paddings superior e inferior.
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
