import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VanzariPage } from './vanzari.page';

describe('VanzariPage', () => {
  let component: VanzariPage;
  let fixture: ComponentFixture<VanzariPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VanzariPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
