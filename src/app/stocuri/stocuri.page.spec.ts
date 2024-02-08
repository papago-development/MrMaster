import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StocuriPage } from './stocuri.page';

describe('StocuriPage', () => {
  let component: StocuriPage;
  let fixture: ComponentFixture<StocuriPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StocuriPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
