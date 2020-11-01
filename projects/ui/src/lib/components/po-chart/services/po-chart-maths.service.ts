import { Injectable } from '@angular/core';

import { PoChartAxisXLabelArea, PoChartPadding } from '../helpers/po-chart-default-values.constant';

import { PoChartContainerSize } from '../interfaces/po-chart-container-size.interface';
import { PoLineChartSeries } from '../interfaces/po-chart-line-series.interface';
import { PoChartMinMaxValues } from '../interfaces/po-chart-min-max-values.interface';

@Injectable({
  providedIn: 'root'
})
export class PoChartMathsService {
  constructor() {}

  // retorna min e max values
  calculateMinAndMaxValues(series: Array<any>): PoChartMinMaxValues {
    const maxValue = Math.max.apply(
      Math,
      series.map(serie => {
        return Math.max.apply(
          Math,
          serie.data.map((data: number) => {
            return data;
          })
        );
      })
    );

    let minValue = Math.min.apply(
      Math,
      series.map(serie => {
        return Math.min.apply(
          Math,
          serie.data.map((data: number) => {
            return data;
          })
        );
      })
    );

    // Tratamento para valores negativos.
    // Se não houver nenhum valor negativo, então o valor mínimo para exibição no label Y será zero
    minValue = minValue > 0 ? 0 : minValue;

    return {
      minValue,
      maxValue
    };

    // importante arredondar!!!!
    // return [0, Math.ceil(maxDataValue / 100) * 100];
  }

  range(minMaxValues: PoChartMinMaxValues, axisXGridLines: number = 5) {
    const { minValue, maxValue } = minMaxValues;

    let step = this.getAxisXGridLineArea(minMaxValues, axisXGridLines);

    if (typeof maxValue == 'undefined') {
      // one param defined
      // maxValue = minValue;
      // minValue = 0;
    }
    if (typeof step == 'undefined') {
      step = 1;
    }
    var result = [];
    for (var i = minValue; step > 0 ? i <= maxValue : i > maxValue; i += step) {
      // resolver arredondamento!!!
      // result.push(Math.ceil(i / 100) * 100);

      result.push(i);
    }

    return result;
  }

  /**
   * Cálculo que retorna o valor obtido da quantidade de AXISXGRIDLINES em relação ao alcance dos valores mínimos e máximos das séries (maxMinValues)
   * @param minMaxValues
   * @param axisXGridLines
   */
  getAxisXGridLineArea(minMaxValues: PoChartMinMaxValues, axisXGridLines: number = 5) {
    const percentageValue = this.getFractionFromInt(axisXGridLines - 1);

    const { minValue, maxValue } = minMaxValues;

    return (percentageValue * (maxValue - minValue)) / 100;
  }

  /**
   * Retorna a fração do número passado referente à quantidade de linhas no eixo X (axisXGridLines)
   */
  getFractionFromInt(value: number) {
    return (1 / value) * (100 / 1);
  }

  /**
   * Retorna o percentual da série dentro da distância entre os valores mínimos e máximos da série.
   * Se o valor mínimo for negativo o alcance partirá dele como sendo zero %.
   * Por exemplo:
   *
   *    minValue = -10;
   *    maxValue = 0;
   *    serieValue = -8
   *    O resultado será de 0.20;
   */
  getSeriePercentage(minMaxValues, serieValue): number {
    const { minValue, maxValue } = minMaxValues;

    const range = maxValue - minValue;
    const displacement = serieValue - minValue;

    return displacement / range;
  }

  /**
   * Retorna o tamanho da série que tiver mais itens.
   */
  seriesGreaterLength(series: Array<PoLineChartSeries>): number {
    return series.reduce((result, serie) => (result > serie.data.length ? result : serie.data.length), 0);
  }

  /**
   * Efetua o cálculo da área lateral entre o os labels X e a plotagem da primeira série. Válido para gráficos do tipo linha e área.
   *
   * > A largura máxima permitida é de 24px.
   */
  calculateSideSpacing(containerWidth: PoChartContainerSize['svgWidth'], seriesLength: number): number {
    const halfCategoryWidth = (containerWidth - PoChartAxisXLabelArea) / seriesLength / 2;

    return halfCategoryWidth <= PoChartPadding ? halfCategoryWidth : PoChartPadding;
  }
}
