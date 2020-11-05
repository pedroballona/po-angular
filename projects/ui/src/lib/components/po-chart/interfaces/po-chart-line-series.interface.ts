/**
 * @usedBy PoChartComponent
 *
 * @description
 *
 * Interface que define o objeto da série `PoChartType.Line`.
 */
export interface PoLineChartSeries {
  /** Define o valor da categoria do objeto. */
  label: string;

  /**
   * @optional
   *
   * @description
   *
   * Define a lista de valores para a série.
   *
   * > Se passado valor `null` em determinado item da lista, a iteração irá ignorá-lo.
   */

  /** Define a lista de valores para a série. */
  data: Array<number>;

  /** Omite os pontos das linhas das séries. O padrão é 'false'. */
  markers?: boolean;

  /**
   * @optional
   *
   * @description
   *
   * Define o texto que será exibido ao passar o mouse por cima das séries do *chart*.
   *
   * > Caso não seja informado um valor para o *tooltip*, será exibido: `categoria: valor proporcional ao total em porcentagem`.
   */
  tooltip?: string;
}
