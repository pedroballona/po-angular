/**
 * @docsPrivate
 *
 * @usedBy PoChartComponent
 *
 * @description
 *
 * Interface que define o objeto com as coordenadas dos pontos das linhas do gráfico do tipo linha.
 */
export interface PoChartPointsCoordinates {
  /** Categoria do eixo Y na qual o item da série está presente. */
  axisCategory: string;

  /** A série para a qual correspondem as coordenadas. */
  category: string;

  /** O texto de exibição no tooltip. */
  label: string;

  /** Valor da série. */
  value: number;

  /** Coordenada horizontal. */
  xCoordinate: number;

  /** Coordenada vertical. */
  yCoordinate: number;
}
