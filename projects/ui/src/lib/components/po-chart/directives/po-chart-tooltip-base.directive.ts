import { Input, Directive } from '@angular/core';

import { PO_CONTROL_POSITIONS } from '../../../services/po-control-position/po-control-position.constants';

const CONTENT_MAX_LENGTH = 140;
const PO_TOOLTIP_POSITION_DEFAULT = 'bottom';

/**
 * @description
 *
 */
@Directive()
export class PoChartTooltipBaseDirective {
  private _tooltipElement: any;
  protected _tooltipPosition?: string = 'bottom';

  /**
   * @description
   *
   * Habilita e atribui um texto ao po-tooltip.
   */
  @Input('p-chart-tooltip') set tooltipElement(tooltip: string) {
    this._tooltipElement = tooltip;
    // if (tooltip && tooltip.length > CONTENT_MAX_LENGTH) {
    //   this._tooltipTitle = tooltip.substring(0, CONTENT_MAX_LENGTH);
    // } else {
    //   this._tooltipTitle = tooltip;
    // }
  }
  get tooltipElement() {
    return this._tooltipElement;
  }

  /**
   * @optional
   *
   * @description
   *
   * Define a posição que o po-tooltip abrirá em relação ao componente alvo. Sugere-se que seja
   * usada a orientação "bottom" (abaixo), porém o mesmo é flexível e será rotacionado
   * automaticamente para se adequar a tela, caso necessário.
   *
   * Posições válidas:
   * - `right`: Posiciona o po-tooltip no lado direito do componente alvo.
   * - `right-bottom`: Posiciona o po-tooltip no lado direito inferior do componente alvo.
   * - `right-top`: Posiciona o po-tooltip no lado direito superior do componente alvo.
   * - `bottom`: Posiciona o po-tooltip abaixo do componente alvo.
   * - `bottom-left`: Posiciona o po-tooltip abaixo e à esquerda do componente alvo.
   * - `bottom-right`: Posiciona o po-tooltip abaixo e à direita do componente alvo.
   * - `left`: Posiciona o po-tooltip no lado esquerdo do componente alvo.
   * - `left-top`: Posiciona o po-tooltip no lado esquerdo superior do componente alvo.
   * - `left-bottom`: Posiciona o po-tooltip no lado esquerdo inferior do componente alvo.
   * - `top`: Posiciona o po-tooltip acima do componente alvo.
   * - `top-right`: Posiciona o po-tooltip acima e à direita do componente alvo.
   * - `top-left`: Posiciona o po-tooltip acima e à esquerda do componente alvo.
   *
   * @default bottom
   */
  @Input('p-tooltip-position') set tooltipPosition(position: string) {
    this._tooltipPosition = PO_CONTROL_POSITIONS.includes(position) ? position : PO_TOOLTIP_POSITION_DEFAULT;
  }
  get tooltipPosition(): string {
    return this._tooltipPosition;
  }
}
