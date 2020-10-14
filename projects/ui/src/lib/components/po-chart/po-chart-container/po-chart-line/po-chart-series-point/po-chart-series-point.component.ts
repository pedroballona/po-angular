import { Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';

const RADIUS_DEFAULT_SIZE = 5;
const RADIUS_HOVER_SIZE = 10;

@Component({
  selector: '[po-chart-series-point]',
  templateUrl: './po-chart-series-point.component.svg'
})
export class PoChartSeriesPointComponent {
  testeTooltip = { title: 'tooltip', x: 200, y: 200 };

  radius: number = RADIUS_DEFAULT_SIZE;

  @Input('p-color') color?: string;

  @Input('p-coordinates') coordinates: Array<Array<{ xCoordinate: number; yCoordinate: number }>>;

  // Referência para o svgPathGroup ao qual pertence o ponto. Necessário para reordenação dos svgElements no DOM para tratamento onHover
  @Input('p-relative-to') relativeTo: string;

  @Output('p-point-hover') pointHover = new EventEmitter<any>();

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  onMouseEnter(event: any) {
    this.renderer.setAttribute(event.target, 'r', RADIUS_HOVER_SIZE.toString());
    this.renderer.setStyle(event.target, 'fill', this.color);

    this.pointHover.emit(this.relativeTo);
  }

  onMouseLeave(event: any) {
    this.renderer.setAttribute(event.target, 'r', RADIUS_DEFAULT_SIZE.toString());
    this.renderer.removeStyle(event.target, 'fill');
  }
}
