import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

import { PoChartTooltipBaseDirective } from './po-chart-tooltip-base.directive';
import { PoTooltipControlPositionService } from '../../../directives/po-tooltip/po-tooltip-control-position.service';

const TOP_AREA = 48;

@Directive({
  selector: '[p-chart-tooltip]',
  providers: [PoTooltipControlPositionService]
})
export class PoChartTooltipDirective extends PoChartTooltipBaseDirective implements OnInit {
  tooltip;
  tooltipText;

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltip) {
      this.show();
    }
  }

  // @HostListener('mouseleave') onMouseLeave() {
  //   if (this.tooltip) { this.hide(); }
  // }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    super();
  }

  ngOnInit() {}

  show() {
    this.create();
    this.renderer.addClass(this.tooltip, 'po-chart-tooltip-show');
  }

  hide() {
    this.renderer.removeClass(this.tooltip, 'po-chart-tooltip-show');
    window.setTimeout(() => {
      this.renderer.removeChild(document.body, this.tooltip);
      this.tooltip = null;
    });
  }

  createSvgTextElement() {
    this.tooltipText = this.renderer.createElement('svg:text', 'svg');
    this.tooltipText.textContent = 'samir tesdsfsfsdfsfsfte';
    this.renderer.addClass(this.tooltipText, 'po-chart-tooltip-text');
    this.renderer.setAttribute(this.tooltipText, 'x', (this.tooltipElement['x'] - 10).toString());
    this.renderer.setAttribute(this.tooltipText, 'y', (this.tooltipElement['y'] - TOP_AREA).toString());
  }

  create() {
    this.createSvgTextElement();

    const svgPointsGroup = this.renderer.parentNode(this.elementRef.nativeElement);

    this.renderer.appendChild(svgPointsGroup, this.tooltipText);
    const SVGRect = this.tooltipText.getBBox();
    // this.renderer.removeChild(svgPointsGroup, this.tooltipText)
    console.log('svgRect', SVGRect);

    this.createRect(SVGRect);
  }

  createRect(SVGRect) {
    const svgPointsGroup = this.renderer.parentNode(this.elementRef.nativeElement);

    const group = this.renderer.createElement('svg:g', 'svg');

    this.tooltip = this.renderer.createElement('svg:rect', 'svg');
    this.renderer.addClass(this.tooltip, 'po-chart-tooltip');
    this.renderer.setAttribute(this.tooltip, 'width', SVGRect.width);
    this.renderer.setAttribute(this.tooltip, 'height', SVGRect.height);
    this.renderer.setAttribute(this.tooltip, 'x', (this.tooltipElement['x'] - 10).toString());
    this.renderer.setAttribute(this.tooltip, 'y', (this.tooltipElement['y'] - TOP_AREA - 20).toString());
    this.renderer.setAttribute(this.tooltip, 'fill', 'yellow');

    this.renderer.appendChild(group, this.tooltip);
    this.renderer.appendChild(group, this.tooltipText);

    this.renderer.appendChild(svgPointsGroup, group);

    // this.renderer.insertBefore(svgPointsGroup, this.tooltip, this.tooltipText);

    // this.renderer.appendChild(svgPointsGroup, this.tooltipText);

    // this.renderer.appendChild(this.elementRef, this.elementRef.nativeElement);
  }
}
