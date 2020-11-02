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
  /** O texto de exibição no tooltip. */
  serieLabel: string;

  /** Valor da série. */
  serieValue: number;

  /** Coordenada horizontal. */
  xCoordinate: number;

  /** Coordenada vertical. */
  yCoordinate: number;
}
