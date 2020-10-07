import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoChartContainerComponent } from './po-chart-container.component';

describe('PoChartContainerComponent', () => {
  let component: PoChartContainerComponent;
  let fixture: ComponentFixture<PoChartContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoChartContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoChartContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
