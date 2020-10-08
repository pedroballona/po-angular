import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoChartAxisYLabelComponent } from './po-chart-axis-y-label.component';

describe('PoChartAxisYLabelComponent', () => {
  let component: PoChartAxisYLabelComponent;
  let fixture: ComponentFixture<PoChartAxisYLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoChartAxisYLabelComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoChartAxisYLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
