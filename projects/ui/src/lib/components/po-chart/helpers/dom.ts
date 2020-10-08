import { PADDING, AXISXLABELAREA } from './default-values';

/**
 * Calcula as dimensões do container
 *
 */
export function calculateContainerSize(
  chartHeight: number,
  chartWrapperWidth: number = 0,
  chartHeaderHeight: number = 0,
  chartLegendHeight: number = 0
) {
  // Largura do container
  const containerWidth = chartWrapperWidth - PADDING * 2;
  const containerCenterX = chartWrapperWidth / 2;

  // Largura da área de plotagem
  // Largura container SVG - PADDING LEFT - (AXIS X LABEL AREA: padding x 2) - (SVG AXIS INTERNAL PLOT AREA: padding left + padding left) - PADDING RIGHT
  const svgPlottingAreaWidth = containerWidth - AXISXLABELAREA - PADDING * 4;

  // Altura do container
  const subtractedHeights = chartHeight - chartHeaderHeight - chartLegendHeight - PADDING * 2;

  const containerHeight = subtractedHeights <= 0 ? 0 : subtractedHeights;
  const containerCenterY = containerHeight / 2;

  // Altura da área de plotagem
  // Subtrai a altura do container SVG pelos paddings superior e inferior.
  const svgPlottingAreaHeight = containerHeight - PADDING;

  return {
    containerWidth,
    containerCenterX,
    svgPlottingAreaWidth,
    containerHeight,
    containerCenterY,
    svgPlottingAreaHeight
  };
}
