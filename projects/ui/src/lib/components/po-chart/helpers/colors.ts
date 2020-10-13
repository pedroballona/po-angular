import { PoChartType } from '../enums/po-chart-type.enum';
import { PoChartSeries } from '../po-chart-base.component';
import { PoChartColors } from './po-chart-colors.constant';

export function getSeriesColor(series: PoChartSeries, type: PoChartType) {
  const colorsLength = PoChartColors.length - 1;

  if (!series) {
    return (this.colors = PoChartColors[colorsLength]);
  }
  if (type === PoChartType.Gauge) {
    return (this.colors = PoChartColors[0]);
  }

  const seriesLength = series.length - 1;

  if (seriesLength > colorsLength) {
    let colors = PoChartColors[colorsLength];

    // recupera o resultado da divisao entre tamanho das series e o numero de cores disponiveis
    const quantityDuplicates = seriesLength / colorsLength;

    for (let i = 1; i <= quantityDuplicates; i++) {
      colors = colors.concat(PoChartColors[colorsLength]);
    }

    return (this.colors = colors);
  }

  return (this.colors = PoChartColors[seriesLength]);
}
