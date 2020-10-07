/**
 * @usedBy PoChartComponent
 *
 * @description
 *
 * Interface que define o objeto da série `PoChartType.Line`.
 */
export interface PoLineChartSeries {
  /** Define o valor da categoria do objeto. */
  categories: Array<any>;

  /** Define a lista de valores para a série. */
  values: Array<number>;

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
