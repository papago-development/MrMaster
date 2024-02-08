import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VeziAvizPage } from './vezi-aviz.page';

describe('VeziAvizPage', () => {
  let component: VeziAvizPage;
  let fixture: ComponentFixture<VeziAvizPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VeziAvizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
