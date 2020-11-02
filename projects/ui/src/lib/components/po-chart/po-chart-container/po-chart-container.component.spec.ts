import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PoChartModule } from '../po-chart.module';

import { PoChartContainerComponent } from './po-chart-container.component';
import { PoChartContainerSize } from '../interfaces/po-chart-container-size.interface';

describe('PoChartContainerComponent', () => {
  let component: PoChartContainerComponent;
  let fixture: ComponentFixture<PoChartContainerComponent>;

  const series = [{ category: 'category', data: [1, 2, 3] }];
  const containerSize: PoChartContainerSize = {
    svgWidth: 200,
    svgHeight: 200,
    svgPlottingAreaWidth: 20,
    svgPlottingAreaHeight: 20
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [PoChartModule],
        declarations: [PoChartContainerComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PoChartContainerComponent);
    component = fixture.componentInstance;
    component.series = series;
    component.containerSize = containerSize;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Methods', () => {
    it('onSerieClick: should emit `serieClick`', () => {
      const spySerieClick = spyOn(component.serieClick, 'emit');

      component.onSerieClick('event');

      expect(spySerieClick).toHaveBeenCalledWith('event');
    });

    it('onSerieHover: should emit `serieHover`', () => {
      const spySerieHover = spyOn(component.serieHover, 'emit');

      component.onSerieHover('event');

      expect(spySerieHover).toHaveBeenCalledWith('event');
    });
  });

  describe('Properties: ', () => {
    it('p-container-size: should call `setViewBox` and apply value to `viewBox`', () => {
      const expectedResult = `1 -1 ${containerSize.svgWidth} ${containerSize.svgHeight}`;

      const spySetViewBox = spyOn(component, <any>'setViewBox').and.callThrough();

      component.containerSize = containerSize;

      expect(spySetViewBox).toHaveBeenCalled();
      expect(component.viewBox).toEqual(expectedResult);
    });
  });
});
