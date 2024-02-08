import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditareFacturiPage } from './editare-facturi.page';

describe('EditareFacturiPage', () => {
  let component: EditareFacturiPage;
  let fixture: ComponentFixture<EditareFacturiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditareFacturiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
