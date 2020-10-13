import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoChartSeriesPointComponent } from './po-chart-series-point.component';

describe('PoChartSeriesPointComponent', () => {
  let component: PoChartSeriesPointComponent;
  let fixture: ComponentFixture<PoChartSeriesPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoChartSeriesPointComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoChartSeriesPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
