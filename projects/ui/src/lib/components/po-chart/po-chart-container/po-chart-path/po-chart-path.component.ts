import { Component, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: '[po-chart-path]',
  templateUrl: './po-chart-path.component.svg'
})
export class PoChartPathComponent implements AfterViewInit {
  animate = true;

  @Input('p-color') color?: string;

  @Input('p-coordinates') coordinates: Array<{ coordinates: string }>;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngAfterViewInit() {}
}
