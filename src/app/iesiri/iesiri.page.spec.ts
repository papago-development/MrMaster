import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IesiriPage } from './iesiri.page';

describe('IesiriPage', () => {
  let component: IesiriPage;
  let fixture: ComponentFixture<IesiriPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IesiriPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
