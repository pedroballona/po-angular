import { PoLineChartSeries } from '../interfaces/po-chart-line-series.interface';
import { PoChartMinMaxValues } from '../interfaces/po-chart-min-max-values.interface';

// retorna min e max values
export function calculateMaxValue(series: Array<any>): PoChartMinMaxValues {
  const maxValue = Math.max.apply(
    Math,
    series.map((serie: PoLineChartSeries) => {
      return Math.max.apply(
        Math,
        serie.values.map((data: number) => {
          return data;
        })
      );
    })
  );

  let minValue = Math.min.apply(
    Math,
    series.map((serie: PoLineChartSeries) => {
      return Math.min.apply(
        Math,
        serie.values.map((data: number) => {
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
export function getSeriePercentage(minMaxValues, serieValue): number {
  const { minValue, maxValue } = minMaxValues;

  const range = maxValue - minValue;
  const displacement = serieValue - minValue;

  return displacement / range;
}

/**
 * Retorna a fração do número passado referente à quantidade de linhas no eixo X (axisXGridLines)
 */

export function getFractionFromInt(value: number) {
  return (1 / value) * (100 / 1);
}

/**
 * Cálculo que retorna o valor obtido da quantidade de AXISXGRIDLINES em relação ao alcance dos valores mínimos e máximos das séries (maxMinValues)
 * @param minMaxValues
 * @param axisXGridLines
 */
export function getAxisXGridLineArea(minMaxValues: PoChartMinMaxValues, axisXGridLines: number = 5) {
  const percentageValue = getFractionFromInt(axisXGridLines - 1);

  const { minValue, maxValue } = minMaxValues;

  return (percentageValue * (maxValue - minValue)) / 100;
}

export function range(minMaxValues: PoChartMinMaxValues, axisXGridLines: number = 5) {
  const { minValue, maxValue } = minMaxValues;

  let step = getAxisXGridLineArea(minMaxValues, axisXGridLines);

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
