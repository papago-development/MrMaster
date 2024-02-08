import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificFacturaPage } from './modific-factura.page';

describe('ModificFacturaPage', () => {
  let component: ModificFacturaPage;
  let fixture: ComponentFixture<ModificFacturaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModificFacturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
