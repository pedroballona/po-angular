import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoChartAxisXComponent } from './po-chart-axis-x.component';

describe('PoChartAxisXComponent', () => {
  let component: PoChartAxisXComponent;
  let fixture: ComponentFixture<PoChartAxisXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoChartAxisXComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoChartAxisXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
