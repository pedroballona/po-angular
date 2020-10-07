import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartAxisComponent } from './chart-axis.component';

describe('ChartAxisComponent', () => {
  let component: ChartAxisComponent;
  let fixture: ComponentFixture<ChartAxisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartAxisComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartAxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
