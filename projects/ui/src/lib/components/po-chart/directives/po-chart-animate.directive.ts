import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[po-chart-animate]'
})
export class PoChartAnimateDirective implements OnInit {
  private _animate: boolean;

  largura;
  podeAnimar = true;

  @Input('po-chart-animate') set animate(value: boolean) {
    this._animate = value;

    if (this.animate) {
      this.runAnimate();
    }
  }

  get animate() {
    return this._animate;
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.largura = this.elementRef.nativeElement.getTotalLength();
    if (this.podeAnimar) {
      this.renderer.setAttribute(this.elementRef.nativeElement, 'stroke-dasharray', this.largura);
      this.renderer.setAttribute(this.elementRef.nativeElement, 'stroke-dashoffset', this.largura);
      this.podeAnimar = false;
    }
  }

  runAnimate() {
    console.log('elementRef', this.elementRef.nativeElement);
  }
}
