import { PoLineChartSeries } from '../interfaces/po-chart-line-series.interface';
import { PoChartMinMaxValues } from '../interfaces/po-chart-min-max-values.interface';

// retorna min e max values
export function calculateMaxValue(series: Array<any>): PoChartMinMaxValues {
  const minValue = 0;

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

  return {
    minValue,
    maxValue
  };

  // importante arredondar!!!!

  // return [0, Math.ceil(maxDataValue / 100) * 100];
}
