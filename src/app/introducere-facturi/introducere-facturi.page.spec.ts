import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntroducereFacturiPage } from './introducere-facturi.page';

describe('IntroducereFacturiPage', () => {
  let component: IntroducereFacturiPage;
  let fixture: ComponentFixture<IntroducereFacturiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IntroducereFacturiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
