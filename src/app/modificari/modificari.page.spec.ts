import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificariPage } from './modificari.page';

describe('ModificariPage', () => {
  let component: ModificariPage;
  let fixture: ComponentFixture<ModificariPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModificariPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
