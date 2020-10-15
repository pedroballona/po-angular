import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

import { PoChartTooltipBaseDirective } from './po-chart-tooltip-base.directive';
import { PoTooltipControlPositionService } from '../../../directives/po-tooltip/po-tooltip-control-position.service';

const TOP_AREA = 48;

@Directive({
  selector: '[p-chart-tooltip]',
  providers: [PoTooltipControlPositionService]
})
export class PoChartTooltipDirective extends PoChartTooltipBaseDirective implements OnInit {
  private arrowDirection: string;
  private divArrow;
  private divContent;
  private isHidden: boolean;
  private lastTooltipText: string;
  private textContent;
  private tooltipContent;
  private tooltipOffset: number = 8;

  private eventListenerFunction: () => void;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private poControlPosition: PoTooltipControlPositionService
  ) {
    super();
  }

  ngOnInit() {
    this.initScrollEventListenerFunction();
  }

  @HostListener('mouseenter') onMouseEnter() {
    setTimeout(() => {
      if (this.tooltip) {
        console.log('entrou this.tooltip');
        this.tooltipContent ? this.showTooltip() : this.createTooltip();

        this.removeArrow(this.arrowDirection);

        this.poControlPosition.adjustPosition(this.tooltipPosition);
        this.arrowDirection = this.poControlPosition.getArrowDirection();

        this.addArrow(this.arrowDirection);

        this.lastTooltipText = this.tooltip;
      }
    });
  }

  @HostListener('mouseleave') onMouseLeave() {
    // necessita do timeout para conseguir adicionar ".po-invisible", pois quando tem alguns elementos
    // próximos com tooltips e ficar passando o mouse em cima, os mesmos não estavam ficando invisiveis.
    setTimeout(() => {
      this.hideTooltip();
    });
  }

  private addArrow(arrowDirection) {
    this.renderer.addClass(this.divArrow, `po-arrow-${arrowDirection}`);
  }

  private addScrollEventListener() {
    window.addEventListener('scroll', this.eventListenerFunction, true);
  }

  // Monta a estrutura do tooltip
  private createTooltip() {
    this.tooltipContent = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipContent, 'po-tooltip');

    this.divArrow = this.renderer.createElement('div');
    this.renderer.addClass(this.divArrow, 'po-tooltip-arrow');

    this.divContent = this.renderer.createElement('div');
    this.renderer.addClass(this.divContent, 'po-tooltip-content');

    this.textContent = this.renderer.createText(this.tooltip);

    this.renderer.appendChild(this.divContent, this.textContent);
    this.renderer.appendChild(this.tooltipContent, this.divArrow);
    this.renderer.appendChild(this.tooltipContent, this.divContent);

    const wrapper = this.renderer.selectRootElement('.po-chart-wrapper', true);

    console.log('teste wrapper', wrapper);

    this.renderer.appendChild(wrapper, this.tooltipContent);

    this.poControlPosition.setElements(this.tooltipContent, this.tooltipOffset, this.elementRef);

    this.addScrollEventListener();
  }

  private initScrollEventListenerFunction() {
    this.eventListenerFunction = () => {
      if (!this.isHidden) {
        setTimeout(() => {
          this.poControlPosition.adjustPosition(this.tooltipPosition);
        });
      }
    };
  }

  private hideTooltip() {
    if (this.tooltipContent) {
      this.renderer.addClass(this.tooltipContent, 'po-invisible');
      this.isHidden = true;

      this.removeScrollEventListener();
    }
  }

  private removeArrow(arrowDirection) {
    if (this.elementRef.nativeElement.querySelector(`.po-arrow-${arrowDirection}`)) {
      this.renderer.removeClass(this.divArrow, `po-arrow-${arrowDirection}`);
    }
  }

  private removeScrollEventListener() {
    window.removeEventListener('scroll', this.eventListenerFunction, true);
  }

  private showTooltip() {
    this.renderer.removeClass(this.tooltipContent, 'po-invisible');
    this.updateTextContent();
    this.isHidden = false;

    this.addScrollEventListener();
  }

  private updateTextContent() {
    if (this.lastTooltipText !== this.tooltip) {
      this.renderer.removeChild(this.divContent, this.textContent);
      this.textContent = this.renderer.createText(this.tooltip);
      this.renderer.appendChild(this.divContent, this.textContent);
    }
  }
}
