/**
 * @docsPrivate
 *
 * @usedBy PoChartComponent
 *
 * @description
 *
 * Agrupamento das medidas utilizadas para dimensionamento do container SVG e para cálculos de plotagem.
 */

export interface PoChartContainerSize {
  /** Largura do container. */
  containerWidth: string;

  /** Metade da largura do container */
  containerCenterX: string;

  /** Altura do container. */
  containerHeight: string;

  /** Metade da altura do container. */
  containerCenterY: string;

  /** Medida da largura do container - (padding lateral) - (area do labelX) - (padding lateral do grid). */
  svgPlottingAreaWidth: string;

  /** Medida da altura do container - padding superior. */
  svgPlottingAreaHeight: string;
}
