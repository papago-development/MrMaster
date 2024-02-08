import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsumuriPage } from './consumuri.page';

describe('ConsumuriPage', () => {
  let component: ConsumuriPage;
  let fixture: ComponentFixture<ConsumuriPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConsumuriPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
