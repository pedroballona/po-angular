import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoChartSeriePathComponent } from './po-chart-serie-path.component';

describe('PoChartSeriePathComponent', () => {
  let component: PoChartSeriePathComponent;
  let fixture: ComponentFixture<PoChartSeriePathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoChartSeriePathComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoChartSeriePathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
