import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoChartAxisXLabelComponent } from './po-chart-axis-x-label.component';

describe('PoChartAxisXLabelComponent', () => {
  let component: PoChartAxisXLabelComponent;
  let fixture: ComponentFixture<PoChartAxisXLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoChartAxisXLabelComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoChartAxisXLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
