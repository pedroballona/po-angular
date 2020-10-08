import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoChartAxisYComponent } from './po-chart-axis-y.component';

describe('PoChartAxisYComponent', () => {
  let component: PoChartAxisYComponent;
  let fixture: ComponentFixture<PoChartAxisYComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoChartAxisYComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoChartAxisYComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
